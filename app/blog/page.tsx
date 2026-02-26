import type { Metadata } from "next"
import BlogShell from "@/components/blog/blog-shell"
import BlogList from "@/components/blog/blog-list"
import BlogPageHeader from "@/components/blog/blog-page-header"
import { getAllPosts } from "@/lib/blog/api"

export const metadata: Metadata = {
  title: "OB.log",
  description:
    "Articles about web engineering, product building, and software craftsmanship by Ousama Beaj.",
}

export default async function BlogPage() {
  const { posts, source, configMissing } = await getAllPosts()

  return (
    <BlogShell>
      <BlogPageHeader />
      <BlogList
        posts={posts}
        isMock={source === "mock"}
        configMissing={configMissing}
      />
    </BlogShell>
  )
}
