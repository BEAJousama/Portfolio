"use client"

import { useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import SnakeGame from "@/components/snake-game"

export default function Hero() {
  const { t, language } = useLanguage()
  const [isGameOpen, setIsGameOpen] = useState(false)
  
  const handleDownloadCV = () => {
    const cvPath = language === "fr" ? "/cv-fr.pdf" : "/cv-en.pdf"
    const link = document.createElement("a")
    link.href = cvPath
    link.download = `Ousama_Beaj_CV_${language.toUpperCase()}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  return (
    <section id="home" className="md:ml-64 min-h-[100dvh] flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto" style={{ padding: "0 1.5rem" }}>

        {/* Profile Image */}
        <div className="flex justify-center mb-8">
        </div>
        {/* Hero section with game-style boxes */}
        <div className="pixel-border bg-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 className="game-title text-xl md:text-2xl text-center" style={{ marginBottom: "1.5rem" }}>
            {t.heroTitle}
          </h2>
          <p className="pixel-text text-sm md:text-base leading-relaxed" style={{ marginBottom: "1rem" }}>
            {t.heroDesc1}
          </p>
          <p className="pixel-text text-sm md:text-base leading-relaxed">
            {t.heroDesc2}
          </p>
        </div>

        {/* Decorative divider */}
        <div className="dashed-divider" style={{ margin: "2rem 0" }}></div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center" style={{ gap: "clamp(0.75rem, 1.5vw, 1rem)" }}>
          <button
            onClick={() => setIsGameOpen(true)}
            className="retro-button font-bold"
            style={{ padding: "clamp(0.5rem, 1vh, 0.75rem) clamp(1rem, 2vw, 1.5rem)", fontSize: "clamp(0.75rem, 1.5vw, 1rem)" }}
          >
            {t.playGame}
          </button>
          <button
            onClick={() => {
              const element = document.getElementById("projects")
              element?.scrollIntoView({ behavior: "smooth" })
            }}
            className="pixel-border bg-accent text-accent-foreground border-2 cursor-pointer font-bold hover:opacity-80 transition-opacity"
            style={{ padding: "clamp(0.5rem, 1vh, 0.75rem) clamp(1rem, 2vw, 1.5rem)", fontSize: "clamp(0.75rem, 1.5vw, 1rem)" }}
          >
            {t.viewProjects}
          </button>
          <button
            onClick={handleDownloadCV}
            className="pixel-border bg-muted text-foreground border-2 cursor-pointer font-bold hover:opacity-80 transition-opacity"
            style={{ padding: "clamp(0.5rem, 1vh, 0.75rem) clamp(1rem, 2vw, 1.5rem)", fontSize: "clamp(0.75rem, 1.5vw, 1rem)" }}
          >
            {t.downloadCV}
          </button>
        </div>

        {/* Snake Game Modal */}
        <SnakeGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
      </div>
    </section>
  )
}
