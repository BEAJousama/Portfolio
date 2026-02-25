"use client"

import { useState, useMemo } from "react"
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"
import PostCard from "@/components/blog/post-card"
import type { BlogPost } from "@/lib/blog/types"

const POSTS_PER_PAGE = 5

type BlogListProps = {
  posts: BlogPost[]
  isMock: boolean
}

export default function BlogList({ posts, isMock }: BlogListProps) {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!query.trim()) return posts
    const q = query.toLowerCase()
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }, [posts, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE)

  const handleQuery = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  const handlePage = (next: number) => {
    setPage(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Search bar */}
      <div className="pixel-border bg-card mb-8 flex items-center gap-3 px-4 py-3">
        <Search size={16} className="shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleQuery(e.target.value)}
          placeholder="Search by title, tag, or keyword…"
          className="pixel-text w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button onClick={() => handleQuery("")} className="shrink-0 text-muted-foreground hover:text-accent">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Mock notice */}
      {isMock && (
        <p className="pixel-text mb-6 inline-block border-2 border-dashed border-border bg-card px-3 py-2 text-xs text-muted-foreground">
          Showing starter posts — add Sanity env vars to load CMS articles.
        </p>
      )}

      {/* Results count when searching */}
      {query && (
        <p className="pixel-text mb-4 text-xs text-muted-foreground">
          {filtered.length === 0
            ? "No articles found."
            : `${filtered.length} article${filtered.length === 1 ? "" : "s"} found`}
        </p>
      )}

      {/* Post list */}
      {paginated.length > 0 ? (
        <section className="grid gap-5 md:gap-6">
          {paginated.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </section>
      ) : (
        <section className="pixel-border bg-card p-8 text-center">
          <p className="pixel-text text-sm text-muted-foreground">No articles match your search.</p>
          <button
            onClick={() => handleQuery("")}
            className="retro-button mt-4 inline-flex text-xs font-semibold"
          >
            [ Clear Search ]
          </button>
        </section>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            onClick={() => handlePage(safePage - 1)}
            disabled={safePage === 1}
            className="sidebar-icon h-10 w-10 disabled:opacity-30"
            title="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePage(p)}
                className={`pixel-border pixel-text h-9 w-9 text-xs font-semibold transition-colors ${
                  p === safePage
                    ? "bg-accent text-accent-foreground"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePage(safePage + 1)}
            disabled={safePage === totalPages}
            className="sidebar-icon h-10 w-10 disabled:opacity-30"
            title="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </>
  )
}
