"use client"

import { useState, useMemo } from "react"
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"
import PostCard from "@/components/blog/post-card"
import type { BlogPost } from "@/lib/blog/types"
import { useLanguage } from "@/contexts/LanguageContext"

const POSTS_PER_PAGE = 5

type BlogListProps = {
  posts: BlogPost[]
  isMock: boolean
  configMissing?: boolean
}

export default function BlogList({ posts, isMock, configMissing }: BlogListProps) {
  const { t } = useLanguage()
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
          placeholder={t.blogSearchPlaceholder}
          className="pixel-text w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button onClick={() => handleQuery("")} className="shrink-0 text-muted-foreground hover:text-accent">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Mock / config notice */}
      {isMock && (
        <div className="pixel-text mb-6 border-2 border-dashed border-border bg-card px-4 py-3 text-xs text-muted-foreground">
          {configMissing ? (
            <>
              <p className="font-semibold text-foreground mb-1">{t.blogSanityNotConfigured}</p>
              <p className="mb-2">
                {t.blogSanityAddEnv}{" "}
                <code className="rounded bg-muted px-1">{t.blogSanityEnvFile}</code>:
              </p>
              <pre className="overflow-x-auto rounded bg-muted/80 px-2 py-1.5 text-[11px]">
                {`NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production`}
              </pre>
              <p className="mt-2">
                <a
                  href="https://sanity.io/manage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2 hover:opacity-80"
                >
                  sanity.io/manage
                </a>
                . {t.blogSanityRestart}
              </p>
            </>
          ) : (
            <p>{t.blogShowingStarter}</p>
          )}
        </div>
      )}

      {/* Results count when searching */}
      {query && (
        <p className="pixel-text mb-4 text-xs text-muted-foreground">
          {filtered.length === 0
            ? t.blogNoArticlesFound
            : filtered.length === 1
              ? `1 ${t.blogArticleFound}`
              : `${filtered.length} ${t.blogArticlesFound}`}
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
          <p className="pixel-text text-sm text-muted-foreground">{t.blogNoMatch}</p>
          <button
            onClick={() => handleQuery("")}
            className="retro-button mt-4 inline-flex text-xs font-semibold"
          >
            {t.blogClearSearch}
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
            title={t.blogPrevPage}
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
            title={t.blogNextPage}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </>
  )
}
