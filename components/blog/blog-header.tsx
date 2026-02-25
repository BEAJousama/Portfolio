"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Moon, Sun, Volume2, VolumeX } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { useSound } from "@/hooks/use-sound"
import { useSoundSettings } from "@/contexts/SoundContext"

export default function BlogHeader() {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const { uiSoundEnabled, toggleUiSound } = useSoundSettings()
  const { playClick, playScrollTick } = useSound()
  const rotatingGroupRef = useRef<SVGGElement>(null)
  const lastScrollBucketRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY

        // Direct DOM update — no React state, no re-render
        if (rotatingGroupRef.current) {
          rotatingGroupRef.current.style.transform = `rotate(${scrollTop * 0.3}deg)`
        }

        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
        const bucket = Math.floor(progress * 10)
        if (bucket > 0 && bucket !== lastScrollBucketRef.current) {
          lastScrollBucketRef.current = bucket
          if (uiSoundEnabled) playScrollTick()
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [uiSoundEnabled, playScrollTick])

  const label = language === "fr" ? "Blog Obeaj" : "Obeaj Blog"
  const backLabel = language === "fr" ? "Retour Portfolio" : "Back to Portfolio"

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-foreground bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          {/* Animated logo as back button */}
          <Link
            href="/"
            className="flex h-16 w-16 items-center justify-center"
            title={backLabel}
            onClick={() => { if (uiSoundEnabled) playClick() }}
          >
            <svg className="h-16 w-16" viewBox="0 0 532 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M180 32C261.738 32 328 98.2619 328 180C328 261.738 261.738 328 180 328C98.2619 328 32 261.738 32 180C32 98.2619 98.2619 32 180 32Z" stroke="var(--accent)" strokeWidth="64" />
              <g ref={rotatingGroupRef} style={{ transformOrigin: "180px 180px" }}>
                <circle cx="180" cy="180" r="148" stroke="white" strokeWidth="64" fill="none" strokeDasharray="233 930" />
              </g>
              <path d="M265.948 10.6237C261.88 8.97487 267.158 8.8648 342.921 9.08465C342.951 9.08462 421.615 9.00034 425.571 9.5407C429.525 10.0812 430.751 10.0808 434.468 11.1618C467.346 20.7251 490.929 45.6891 502.475 81.194C507.203 95.8137 507.752 115.49 504.014 132.198C501.265 144.509 493.788 160.008 485.761 169.681C483.671 172.21 482.021 174.628 482.021 174.958C482.022 175.398 484.991 178.695 488.619 182.432C504.893 198.921 515.23 221.894 516.77 244.978C519.848 290.046 491.809 334.235 450.573 349.295C432.1 356 432.759 356 342.921 356C292.998 356 261 355.56 261 355.01C261.001 354.461 262.1 353.582 263.529 353.142C269.028 351.493 287.501 341.71 296.737 335.554C308.173 328.08 327.527 309.283 334.784 298.841L339.732 291.695L382.067 291.146L424.292 290.596L431.77 286.968C439.797 283.011 443.975 278.504 448.264 269.161C450.133 265.204 450.573 261.906 450.573 253.222C450.683 243 450.352 241.681 447.054 234.866C442.325 225.193 433.969 217.498 424.622 214.31C418.574 212.222 415.275 212.002 395.482 212.002H373.16L373.93 202.878C375.359 188.148 374.7 159.459 372.94 152.973L371.291 147.258L392.844 146.927C417.475 146.598 420.444 145.718 429.681 136.705C448.154 118.787 443.865 88.9978 420.993 77.0163L415.495 74.0485L377.889 73.4987L340.282 72.9499L334.784 65.0348C327.747 55.0319 308.723 36.1251 297.617 28.2106C289.26 22.165 274.855 14.1413 265.948 10.6237Z" fill="var(--accent)" />
            </svg>
          </Link>

          <div>
            <p className="game-title text-sm md:text-base">{label}</p>
            <Link
              href="/"
              className="pixel-text text-xs text-muted-foreground hover:text-accent"
              onClick={() => { if (uiSoundEnabled) playClick() }}
            >
              ← {backLabel}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { if (uiSoundEnabled) playClick(); setLanguage(language === "en" ? "fr" : "en") }}
            className="sidebar-icon h-10 w-10 text-xs font-semibold"
            title="Switch language"
          >
            {language.toUpperCase()}
          </button>
          <button
            onClick={() => { if (uiSoundEnabled) playClick(); toggleTheme() }}
            className="sidebar-icon h-10 w-10"
            title="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => { if (uiSoundEnabled) playClick(); toggleUiSound() }}
            className="sidebar-icon h-10 w-10"
            title="Toggle UI sounds"
          >
            {uiSoundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
