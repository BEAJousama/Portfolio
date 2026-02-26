"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Home, ArrowLeft } from "lucide-react"
import CustomCursor from "@/components/custom-cursor"

export default function NotFound() {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 200)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-center bg-background text-foreground p-4 relative overflow-hidden">
      <CustomCursor />
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
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

      {/* Floating particles effect - deterministic values to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const left = (i * 13 + 5) % 97
          const top = (i * 17 + 11) % 94
          const delay = (i % 10) * 0.3
          const duration = 2 + (i % 5) * 0.4
          const opacity = 0.3 + (i % 7) / 14
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

      <div className="relative z-10 text-center max-w-lg">
        {/* Glitching 404 text */}
        <div className={`relative mb-8 ${glitching ? "animate-pulse" : ""}`}>
          <h1
            className="game-title text-[120px] md:text-[180px] leading-none tracking-tighter"
            style={{
              textShadow: `
                4px 4px 0 var(--accent),
                -4px -4px 0 #ff6b6b,
                8px 0 0 #4ecdc4
              `,
              animation: glitching ? "glitch 0.3s ease-in-out" : "none",
            }}
          >
            404
          </h1>
          <p
            className="game-title absolute -bottom-4 left-1/2 -translate-x-1/2 text-xl md:text-2xl whitespace-nowrap"
            style={{ color: "var(--accent)" }}
          >
            PAGE NOT FOUND
          </p>
        </div>

        {/* Error message */}
        <div className="pixel-border bg-card p-6 mb-8">
          <p className="pixel-text text-sm md:text-base text-muted-foreground mb-2">
            Oops! The page you&apos;re looking for has been lost to the void.
          </p>
          <p className="pixel-text text-xs md:text-sm text-muted-foreground">
            Like a deleted save file... it&apos;s gone forever.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="retro-button inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 whitespace-nowrap w-fit min-w-0 shrink-0"
          >
            <Home size={18} className="shrink-0" />
            <span>[ Return Home ]</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="go-back-button inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 whitespace-nowrap"
          >
            <ArrowLeft size={18} className="shrink-0" />
            <span>[ Go Back ]</span>
          </button>
        </div>

        {/* Decorative stats */}
        <div className="mt-12 flex justify-center gap-8 text-xs pixel-text text-muted-foreground">
          <div>
            <span className="text-accent">ERROR</span>
            <p>404</p>
          </div>
          <div>
            <span className="text-accent">STATUS</span>
            <p>NOT FOUND</p>
          </div>
          <div>
            <span className="text-accent">LEVEL</span>
            <p>1/100</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .go-back-button {
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
        .go-back-button:hover {
          background-color: var(--accent);
          color: var(--accent-foreground);
          box-shadow: -2px -2px 0px rgba(0, 0, 0, 0.1);
        }
        .go-back-button:active {
          box-shadow: inset -2px -2px 0px rgba(0, 0, 0, 0.1);
        }

        @keyframes glitch {
          0%,
          100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-4px, 4px);
          }
          40% {
            transform: translate(4px, -4px);
          }
          60% {
            transform: translate(-4px, -4px);
          }
          80% {
            transform: translate(4px, 4px);
          }
        }

        .animate-pulse {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}
