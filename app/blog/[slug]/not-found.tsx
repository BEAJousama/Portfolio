import Link from "next/link"
import BlogShell from "@/components/blog/blog-shell"

export default function BlogPostNotFound() {
  return (
    <BlogShell>
      <section className="pixel-border bg-card p-8 md:p-10">
        <h1 className="game-title mb-4 text-xl md:text-2xl">Post Not Found</h1>
        <p className="pixel-text mb-6 text-sm text-muted-foreground md:text-base">
          This article does not exist yet or is still unpublished.
        </p>
        <Link href="/blog" className="retro-button inline-flex items-center text-xs font-semibold md:text-sm">
          [ Back to Blog ]
        </Link>
      </section>
    </BlogShell>
  )
}
