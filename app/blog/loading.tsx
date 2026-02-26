"use client"

import BlogShell from "@/components/blog/blog-shell"

function SkeletonCard() {
  return (
    <article className="pixel-border bg-card animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-video bg-muted" />

      <div className="p-5 md:p-6">
        {/* Tags placeholder */}
        <div className="mb-3 flex gap-2">
          <div className="h-5 w-16 rounded bg-muted" />
          <div className="h-5 w-20 rounded bg-muted" />
        </div>

        {/* Title placeholder */}
        <div className="mb-3 h-7 w-3/4 rounded bg-muted" />

        {/* Excerpt placeholder */}
        <div className="mb-4 space-y-2">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
          <div className="h-4 w-4/6 rounded bg-muted" />
        </div>

        {/* Date placeholder */}
        <div className="h-4 w-32 rounded bg-muted" />
      </div>
    </article>
  )
}

function SearchBarSkeleton() {
  return (
    <div className="pixel-border bg-card mb-8 flex items-center gap-3 px-4 py-3">
      <div className="h-4 w-4 rounded bg-muted" />
      <div className="h-4 w-full rounded bg-muted" />
    </div>
  )
}

export default function BlogLoading() {
  return (
    <BlogShell>
      <SearchBarSkeleton />

      <section className="grid gap-5 md:gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
    </BlogShell>
  )
}
