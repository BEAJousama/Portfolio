import BlogShell from "@/components/blog/blog-shell"

export default function BlogLoading() {
  return (
    <BlogShell>
      <section className="pixel-border bg-card p-8 md:p-10">
        <p className="game-title text-sm md:text-base">Loading blog...</p>
      </section>
    </BlogShell>
  )
}
