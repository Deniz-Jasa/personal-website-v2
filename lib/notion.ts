import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

export type NotionPost = {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary: string
    image?: string
  }
  content: string
}

// Parse "04/05/2025 - Building a Hackathon Community" →
// { date: "2025-04-05", title: "Building a Hackathon Community" }
function parsePageTitle(raw: string): { title: string; date: string } {
  const match = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})\s*[-–]\s*(.+)$/)
  if (match) {
    const [, mm, dd, yyyy, title] = match
    return { title: title.trim(), date: `${yyyy}-${mm}-${dd}` }
  }
  return { title: raw.trim(), date: new Date().toISOString().split('T')[0] }
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function getNotionPosts(): Promise<NotionPost[]> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_BLOG_PAGE_ID) {
    return []
  }

  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const n2m = new NotionToMarkdown({ notionClient: notion })

  // Fetch all child blocks of the Blog page
  const { results } = await notion.blocks.children.list({
    block_id: process.env.NOTION_BLOG_PAGE_ID,
  })

  // Keep only child_page blocks
  const childPages = results.filter((b: any) => b.type === 'child_page')

  const posts = await Promise.all(
    childPages.map(async (block: any) => {
      const raw: string = block.child_page.title
      const { title, date } = parsePageTitle(raw)
      const slug = toSlug(title)

      const mdBlocks = await n2m.pageToMarkdown(block.id)
      const content = n2m.toMarkdownString(mdBlocks).parent

      return {
        slug,
        metadata: { title, publishedAt: date, summary: '' },
        content,
      }
    })
  )

  // Sort newest first
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  )
}
