"use client"

import Link from "next/link"
import { FileQuestion, Home, ArrowLeft } from "lucide-react"
import BlogShell from "@/components/blog/blog-shell"

export default function BlogPostNotFound() {
  return (
    <BlogShell>
      <div className="relative flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Deterministic particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => {
            const left = (i * 19 + 7) % 95
            const top = (i * 23 + 13) % 90
            const delay = (i % 8) * 0.25
            const duration = 2.2 + (i % 4) * 0.3
            const opacity = 0.25 + (i % 6) / 12
            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-accent rounded-full animate-pulse"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  opacity,
                }}
              />
            )
          })}
        </div>

        <div className="relative z-10 max-w-lg">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="pixel-border flex h-20 w-20 items-center justify-center bg-card">
              <FileQuestion className="h-10 w-10 text-accent" />
            </div>
          </div>

          <h1 className="game-title mb-2 text-4xl md:text-5xl" style={{ color: "var(--accent)" }}>
            POST NOT FOUND
          </h1>
          <p className="game-title mb-6 text-lg text-muted-foreground md:text-xl">
            404 · Article missing
          </p>

          <div className="pixel-border bg-card p-6 mb-8">
            <p className="pixel-text text-sm md:text-base text-muted-foreground mb-2">
              This article doesn&apos;t exist yet or is still unpublished.
            </p>
            <p className="pixel-text text-xs md:text-sm text-muted-foreground">
              Maybe it was never written, or it got lost in the CMS.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/blog"
              className="retro-button inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 whitespace-nowrap w-fit"
            >
              <ArrowLeft size={18} className="shrink-0" />
              <span>[ Back to Blog ]</span>
            </Link>
            <Link
              href="/"
              className="blog-404-home-button inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 whitespace-nowrap w-fit"
            >
              <Home size={18} className="shrink-0" />
              <span>[ Home ]</span>
            </Link>
          </div>

          <div className="mt-12 flex justify-center gap-8 text-xs pixel-text text-muted-foreground">
            <div>
              <span className="text-accent">OB.log</span>
              <p>404</p>
            </div>
            <div>
              <span className="text-accent">STATUS</span>
              <p>NOT FOUND</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .blog-404-home-button {
            width: auto;
            min-width: fit-content;
            height: auto;
            min-height: 2.5rem;
            padding: 0.5rem 1.5rem;
            background-color: var(--card);
            border: 2px solid var(--border);
            color: var(--foreground);
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: "JetBrains Mono", "Courier New", monospace;
          }
          .blog-404-home-button:hover {
            background-color: var(--accent);
            color: var(--accent-foreground);
            box-shadow: -2px -2px 0px rgba(0, 0, 0, 0.1);
          }
          .blog-404-home-button:active {
            box-shadow: inset -2px -2px 0px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    </BlogShell>
  )
}
