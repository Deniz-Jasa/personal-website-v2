import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <div>
      <div className="relative -mx-8 md:-mx-4 lg:-mx-[max(1rem,calc((100vw-62rem)/2))] -mt-[3rem] md:-mt-[4rem] h-60 md:h-[22rem] overflow-hidden">
        <img
          src="/imgs/cover.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-[#14120B]" />
      </div>

      <section className="mt-10">
        <h1 className="font-semibold text-2xl tracking-tighter mb-4">My Personal Blog</h1>
        <p className="mb-8">A space to share my thoughts, ideas, and experiences through writing.</p>
        <BlogPosts />
      </section>
    </div>
  )
}
