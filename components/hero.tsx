"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import SnakeGame from "@/components/snake-game"

export default function Hero() {
  const { t, language } = useLanguage()
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [typedTitle, setTypedTitle] = useState("")
  const [showContent, setShowContent] = useState(false)

  // Fade in effect on mount
  useEffect(() => {
    setShowContent(true)
  }, [])

  // Typing effect for title
  useEffect(() => {
    const title = t.heroTitle
    let index = 0
    
    const timer = setInterval(() => {
      if (index <= title.length) {
        setTypedTitle(title.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 80)
    
    return () => clearInterval(timer)
  }, [t.heroTitle])

  const handleDownloadCV = () => {
    const cvPath = language === "fr" ? "/cv.fr.pdf" : "/cv.en.pdf"
    const link = document.createElement("a")
    link.href = cvPath
    link.download = `Ousama_Beaj_CV_${language.toUpperCase()}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="home" className="md:ml-64 min-h-dvh flex items-center justify-center" style={{ position: "relative" }}>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      <div className="w-full max-w-6xl mx-auto" style={{ padding: "0 1.5rem", position: "relative", zIndex: 1 }}>

        {/* Hero section with game-style boxes */}
        <div 
          className="pixel-border bg-card fade-in" 
          style={{ 
            padding: "1.5rem", 
            marginBottom: "2rem",
            opacity: 0,
            animationDelay: "0.2s",
          }}
        >
          {/* Typing effect title */}
          <h2 className="game-title text-xl md:text-2xl text-center" style={{ marginBottom: "1.5rem" }}>
            {typedTitle}
            <span style={{ 
              animation: "blink 1s step-end infinite",
              color: "var(--accent)" 
            }}>|</span>
          </h2>
          
          <p className="pixel-text text-sm md:text-base leading-relaxed fade-in" style={{ marginBottom: "1rem", opacity: 0, animationDelay: "0.5s" }}>
            {t.heroDesc1}
          </p>
          <p className="pixel-text text-sm md:text-base leading-relaxed fade-in" style={{ opacity: 0, animationDelay: "0.7s" }}>
            {t.heroDesc2}
          </p>
        </div>

        {/* Decorative divider */}
        <div className="dashed-divider fade-in" style={{ margin: "2rem 0", opacity: 0, animationDelay: "0.9s" }}></div>

        {/* CTA Buttons with smooth hover effects */}
        <div className="flex flex-col md:flex-row justify-center items-center fade-in" style={{ gap: "clamp(0.75rem, 1.5vw, 1rem)", opacity: 0, animationDelay: "1.1s" }}>
          <button
            onClick={() => setIsGameOpen(true)}
            className="retro-button font-bold"
            style={{ 
              padding: "clamp(0.5rem, 1vh, 0.75rem) clamp(1rem, 2vw, 1.5rem)", 
              fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
            }}
          >
            {t.playGame}
          </button>
          <button
            onClick={() => {
              const element = document.getElementById("projects")
              element?.scrollIntoView({ behavior: "smooth" })
            }}
            className="pixel-border bg-accent text-accent-foreground border-2 cursor-pointer font-bold"
            style={{ 
              padding: "clamp(0.5rem, 1vh, 0.75rem) clamp(1rem, 2vw, 1.5rem)", 
              fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            {t.viewProjects}
          </button>
          <button
            onClick={handleDownloadCV}
            className="pixel-border bg-muted text-foreground border-2 cursor-pointer font-bold"
            style={{ 
              padding: "clamp(0.5rem, 1vh, 0.75rem) clamp(1rem, 2vw, 1.5rem)", 
              fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            {t.downloadCV}
          </button>
        </div>

        {/* Scroll indicator */}
        <div 
          className="flex flex-col items-center fade-in" 
          style={{ marginTop: "3rem", opacity: 0, animationDelay: "1.3s" }}
        >
          <div className="pixel-text" style={{ fontSize: "0.65rem", marginBottom: "0.5rem" }}>
            ↓
          </div>
          <div className="pixel-text" style={{ fontSize: "0.55rem", opacity: 0.6 }}>
            Scroll to explore
          </div>
        </div>
      </div>

      {/* Snake Game Modal */}
      <SnakeGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </section>
  )
}
