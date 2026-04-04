import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4 group"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-row items-baseline justify-between gap-4">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight transition-colors group-hover:text-neutral-500 dark:group-hover:text-neutral-400 truncate">
                {post.metadata.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 tabular-nums shrink-0">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
