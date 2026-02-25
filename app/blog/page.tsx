import type { Metadata } from "next"
import BlogShell from "@/components/blog/blog-shell"
import BlogList from "@/components/blog/blog-list"
import { getAllPosts } from "@/lib/blog/api"

export const metadata: Metadata = {
  title: "Obeaj Blog",
  description:
    "Articles about web engineering, product building, and software craftsmanship by Ousama Beaj.",
}

export default async function BlogPage() {
  const { posts, source } = await getAllPosts()

  return (
    <BlogShell>
      <section className="mb-10">
        <h1 className="game-title mb-3 text-2xl md:text-3xl">Obeaj Blog</h1>
        <p className="pixel-text max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Engineering notes, lessons from real projects, and behind-the-scenes decisions from
          building performant fullstack products.
        </p>
      </section>

      <BlogList posts={posts} isMock={source === "mock"} />
    </BlogShell>
  )
}
