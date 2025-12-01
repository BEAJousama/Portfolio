"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import LoadingScreen from "@/components/loading-screen"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { ThemeProvider } from "@/contexts/ThemeContext"

// Dynamically import all components with no SSR to prevent flash
const Header = dynamic(() => import("@/components/header"), { ssr: false })
const Hero = dynamic(() => import("@/components/hero"), { ssr: false })
const About = dynamic(() => import("@/components/about"), { ssr: false })
const Skills = dynamic(() => import("@/components/skills"), { ssr: false })
const Projects = dynamic(() => import("@/components/projects"), { ssr: false })
const Contact = dynamic(() => import("@/components/contact"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Mandatory minimum loading time of 2 seconds
    const timer = setTimeout(() => {
      setIsLoaded(true)
      // Add small delay before showing content for smooth transition
      setTimeout(() => setShowContent(true), 100)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showContent) return

    const sections = ["home", "about", "skills", "projects", "contact"]
    let currentSectionIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      // Arrow Down or Page Down
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault()
        if (currentSectionIndex < sections.length - 1) {
          currentSectionIndex++
          const element = document.getElementById(sections[currentSectionIndex])
          element?.scrollIntoView({ behavior: "smooth" })
        }
      }
      // Arrow Up or Page Up
      else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault()
        if (currentSectionIndex > 0) {
          currentSectionIndex--
          const element = document.getElementById(sections[currentSectionIndex])
          element?.scrollIntoView({ behavior: "smooth" })
        }
      }
      // Home key - go to first section
      else if (e.key === "Home") {
        e.preventDefault()
        currentSectionIndex = 0
        const element = document.getElementById(sections[0])
        element?.scrollIntoView({ behavior: "smooth" })
      }
      // End key - go to last section
      else if (e.key === "End") {
        e.preventDefault()
        currentSectionIndex = sections.length - 1
        const element = document.getElementById(sections[currentSectionIndex])
        element?.scrollIntoView({ behavior: "smooth" })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showContent])

  if (!isLoaded) {
    return <LoadingScreen />
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground" style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          <CustomCursor />
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
