"use client"

import { useState, useEffect, useRef } from "react"
import type { TocHeading } from "@/lib/blog/toc"

type Props = {
  headings: TocHeading[]
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "")
  const [mobileOpen, setMobileOpen] = useState(false)

  // Refs for direct DOM animation — bypass React state/re-render entirely
  const stripRef = useRef<HTMLDivElement>(null)
  const desktopSidebarRef = useRef<HTMLDivElement>(null)
  const desktopProgressRef = useRef<HTMLDivElement>(null)
  const mobileProgressRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  // Scroll spy — track active heading
  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-92px 0% -60% 0%", threshold: 0 },
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  // Scroll-driven animations — direct DOM updates inside rAF, zero React overhead
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const sy = window.scrollY
        const h = document.documentElement.scrollHeight - window.innerHeight
        const pct = h > 0 ? Math.min((sy / h) * 100, 100) : 0
        const pctStr = `${pct}%`

        if (desktopProgressRef.current) desktopProgressRef.current.style.width = pctStr
        if (mobileProgressRef.current) mobileProgressRef.current.style.width = pctStr
        if (desktopSidebarRef.current) {
          desktopSidebarRef.current.style.top = `${Math.max(92, 128 - sy)}px`
        }
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll() // seed on mount so values are correct from initial scroll position
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Close dropdown on scroll — delayed so the micro-scroll from the tap that
  // opened the dropdown doesn't immediately close it again.
  useEffect(() => {
    if (!mobileOpen) return
    const close = () => setMobileOpen(false)
    const timer = setTimeout(() => {
      window.addEventListener("scroll", close, { passive: true, once: true })
    }, 150)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", close)
    }
  }, [mobileOpen])

  // Close dropdown on outside click
  useEffect(() => {
    if (!mobileOpen) return
    const onClickOutside = (e: MouseEvent) => {
      if (stripRef.current && !stripRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [mobileOpen])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setMobileOpen(false)
  }

  const activeHeading = headings.find((h) => h.id === activeId)

  const navList = (
    <ol className="space-y-px">
      {headings.map(({ id, text, level }) => {
        const isActive = id === activeId
        return (
          <li key={id} style={{ paddingLeft: `${(level - 2) * 14}px` }}>
            <button
              onClick={() => scrollTo(id)}
              className={`pixel-text group flex w-full items-start gap-2 border-l-2 py-1.5 pl-3 text-left transition-all duration-150 ${
                isActive
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              }`}
              style={{ fontSize: level === 2 ? "0.68rem" : "0.62rem" }}
            >
              <span
                className={`mt-[3px] inline-block shrink-0 transition-all duration-150 ${
                  level === 2 ? "h-[7px] w-[7px]" : "h-[5px] w-[5px]"
                } ${isActive ? "bg-accent" : "border border-current opacity-40 group-hover:opacity-70"}`}
              />
              <span className="line-clamp-2 leading-[1.4]">{text}</span>
            </button>
          </li>
        )
      })}
    </ol>
  )

  return (
    <>
      {/*
        ══ DESKTOP FIXED SIDEBAR — left of article, min-[1440px]+ ══
        Article is max-w-5xl (1024px = 512px half-width), centred.
        "right: calc(50vw + 512px + 20px)" positions the sidebar's right
        edge 20px to the left of the article's left edge at any viewport.
        Width 170px → at 1440px sidebar occupies 28px–198px (plenty of room).
      */}
      {/*
        sidebarTop: starts at 128px (= BlogShell's md:pt-32, the article card's
        top edge on initial load). As you scroll it glides down to 92px (the
        header bottom) and stays pinned there for the rest of the article.
      */}
      <div
        ref={desktopSidebarRef}
        className="fixed z-30 hidden min-[1440px]:block"
        style={{
          top: "128px", // seed; immediately updated by the rAF scroll handler
          right: "calc(50vw + 512px + 20px)",
          width: "170px",
        }}
      >
        <div className="pixel-border bg-card p-4">
          <div className="mb-4 flex items-center gap-2">
            <span className="game-title text-[0.55rem] tracking-widest text-accent">[ INDEX ]</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          {/* Progress bar inside desktop sidebar */}
          <div className="mb-4 h-[3px] w-full overflow-hidden bg-border">
            <div ref={desktopProgressRef} className="h-full bg-accent" style={{ width: "0%" }} />
          </div>

          <nav aria-label="Article sections">{navList}</nav>

          <p className="pixel-text mt-4 border-t border-border pt-3 text-[0.58rem] text-muted-foreground">
            {headings.filter((h) => h.level === 2).length}&nbsp;sections
          </p>
        </div>
      </div>

      {/*
        ══ MOBILE / TABLET STICKY STRIP — below header, < min-[1440px] ══
        Sticks at top: 92px (= header height) so it sits flush under the
        fixed header the moment you start scrolling.
        Shows: accent progress bar + current section name + [ ▼ ] toggle.
        Expands into a dropdown panel with the full ToC.
      */}
      <div
        ref={stripRef}
        className="sticky z-40 min-[1440px]:hidden"
        style={{ top: "92px" }}
      >
        {/* ── Progress bar ── */}
        <div className="h-[3px] bg-border">
          <div ref={mobileProgressRef} className="h-full bg-accent" style={{ width: "0%" }} />
        </div>

        {/* ── Section indicator + toggle ── */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          className="flex w-full items-center justify-between border-b-2 border-border bg-background/95 px-4 py-2.5 backdrop-blur"
        >
          <span className="pixel-text flex min-w-0 items-center gap-2 text-[0.65rem]">
            <span
              className="shrink-0 text-accent transition-transform duration-200"
              style={{ display: "inline-block", transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              ▶
            </span>
            <span className="truncate text-muted-foreground">
              {activeHeading?.text ?? "Introduction"}
            </span>
          </span>
          <span className="game-title ml-3 shrink-0 text-[0.5rem] tracking-widest text-accent">
            {mobileOpen ? "[ ▲ ]" : "[ ▼ ]"}
          </span>
        </button>

        {/* ── Dropdown panel ── */}
        {mobileOpen && (
          <div className="max-h-[55vh] overflow-y-auto border-b-2 border-x-2 border-border bg-card px-4 py-4 shadow-xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="game-title text-[0.55rem] tracking-widest text-accent">[ INDEX ]</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <nav aria-label="Article sections">{navList}</nav>
          </div>
        )}
      </div>
    </>
  )
}
