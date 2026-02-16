"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Github, Linkedin, Sun, Moon } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTheme } from "@/contexts/ThemeContext"

export default function Header() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { id: "home", label: t.home },
    { id: "about", label: t.about },
    { id: "skills", label: t.skills },
    { id: "projects", label: t.projects },
    { id: "contact", label: t.contact },
  ]

  useEffect(() => {
    const handleScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScrollProgress)
    handleScrollProgress() // Initialize on mount
    return () => window.removeEventListener("scroll", handleScrollProgress)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  const handleScroll = (id: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground md:left-0 md:top-0 md:h-dvh md:w-64 md:border-b-0 md:border-r-4 md:flex md:flex-col md:justify-between"
        style={{ padding: 0 }}
      >
        <div
          className="flex items-center border-b-4 border-foreground md:border-b-0 md:flex-col md:items-start md:gap-8"
          style={{ padding: "1rem" }}
        >
          <div className="flex items-center justify-between w-full md:w-full md:flex-col md:items-start md:gap-4">
            {/* Logo on mobile - left of name with scroll animation */}
            <div className="md:hidden">
              <svg className="w-12 h-12" viewBox="0 0 532 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M180 32C261.738 32 328 98.2619 328 180C328 261.738 261.738 328 180 328C98.2619 328 32 261.738 32 180C32 98.2619 98.2619 32 180 32Z" stroke={theme === "dark" ? "#5f052d" : "#5f052d"} strokeWidth="64" />
                <g style={{ transformOrigin: "180px 180px", transform: `rotate(${scrollProgress * 360}deg)` }}>
                  <circle cx="180" cy="180" r="148" stroke={theme === "dark" ? "#C7CACC" : "#fff"} strokeWidth="64" fill="none" strokeDasharray="233 930" style={{ transition: "transform 0.05s linear" }} />
                </g>
                <path d="M265.948 10.6237C261.88 8.97487 267.158 8.8648 342.921 9.08465C342.951 9.08462 421.615 9.00034 425.571 9.5407C429.525 10.0812 430.751 10.0808 434.468 11.1618C467.346 20.7251 490.929 45.6891 502.475 81.194C507.203 95.8137 507.752 115.49 504.014 132.198C501.265 144.509 493.788 160.008 485.761 169.681C483.671 172.21 482.021 174.628 482.021 174.958C482.022 175.398 484.991 178.695 488.619 182.432C504.893 198.921 515.23 221.894 516.77 244.978C519.848 290.046 491.809 334.235 450.573 349.295C432.1 356 432.759 356 342.921 356C292.998 356 261 355.56 261 355.01C261.001 354.461 262.1 353.582 263.529 353.142C269.028 351.493 287.501 341.71 296.737 335.554C308.173 328.08 327.527 309.283 334.784 298.841L339.732 291.695L382.067 291.146L424.292 290.596L431.77 286.968C439.797 283.011 443.975 278.504 448.264 269.161C450.133 265.204 450.573 261.906 450.573 253.222C450.683 243 450.352 241.681 447.054 234.866C442.325 225.193 433.969 217.498 424.622 214.31C418.574 212.222 415.275 212.002 395.482 212.002H373.16L373.93 202.878C375.359 188.148 374.7 159.459 372.94 152.973L371.291 147.258L392.844 146.927C417.475 146.598 420.444 145.718 429.681 136.705C448.154 118.787 443.865 88.9978 420.993 77.0163L415.495 74.0485L377.889 73.4987L340.282 72.9499L334.784 65.0348C327.747 55.0319 308.723 36.1251 297.617 28.2106C289.26 22.165 274.855 14.1413 265.948 10.6237Z" fill={theme === "dark" ? "#5f052d" : "#5f052d"} />
              </svg>
            </div>
            <div className="flex flex-col items-center justify-center w-full md:items-start md:justify-start">
              <h1 className="game-title text-xl md:text-md" style={{ fontSize: "clamp(1.2rem, 4vw, 1.5rem)" }}>
                Ousama Beaj
              </h1>
              <p className="pixel-text text-xs mt-1 text-foreground">{t.role}</p>
            </div>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden pixel-border bg-accent text-accent-foreground"
              style={{ padding: "0.5rem" }}
            >
              ☰
            </button>
          </div>

        </div>

        {/* Navigation */}
        <nav
          className={`md:block fixed md:relative left-0 right-0 md:inset-auto bg-background md:bg-transparent z-40 md:z-auto border-t-4 md:border-t-0 border-foreground transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
          }`}
          style={{ 
            padding: "1rem",
            top: mobileMenuOpen ? "80px" : "-100%",
            bottom: mobileMenuOpen ? "0" : "auto",
            ...(mobileMenuOpen ? {} : { top: "auto" })
          }}
        >
          <div className="flex flex-col h-full md:h-auto justify-center md:justify-start space-y-6">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                style={{ 
                  padding: "1rem 1.5rem",
                  transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
                  opacity: mobileMenuOpen ? 1 : 0,
                  transition: `all 0.4s ease-in-out ${index * 0.1}s`,
                }}
                className={`block w-full text-left pixel-text text-lg md:text-sm font-bold md:transform-none! md:opacity-100! transition-all ${
                  activeSection === item.id 
                    ? "bg-accent text-accent-foreground pixel-border" 
                    : "text-foreground hover:text-accent hover:bg-muted"
                }`}
              >
                &gt; {item.label}
              </button>
            ))}
          
            {/* Language Switcher - Mobile */}
            <div className="md:hidden pt-4 border-t-2 border-dashed border-foreground"
              style={{ 
                transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
                opacity: mobileMenuOpen ? 1 : 0,
                transition: `all 0.4s ease-in-out ${navItems.length * 0.1}s`,
              }}
            >
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setLanguage("en")}
                  className={`pixel-border pixel-text text-sm font-bold flex-1 transition-colors ${
                    language === "en" 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-card text-foreground hover:bg-muted"
                  }`}
                  style={{ padding: "0.75rem" }}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("fr")}
                  className={`pixel-border pixel-text text-sm font-bold flex-1 transition-colors ${
                    language === "fr" 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-card text-foreground hover:bg-muted"
                  }`}
                  style={{ padding: "0.75rem" }}
                >
                  FR
                </button>
              </div>
              <button
                onClick={toggleTheme}
                className="w-full pixel-border pixel-text text-sm font-bold bg-card text-foreground hover:bg-muted transition-colors"
                style={{ padding: "0.75rem" }}
              >
                {theme === "light" ? "🌙 DARK MODE" : "☀️ LIGHT MODE"}
              </button>
            </div>
          </div>
        </nav>

        <div
          className="hidden md:flex border-t-4 border-foreground items-center justify-center"
          style={{ padding: "1.5rem", gap: "1.5rem" }}
        >
          <button
            onClick={toggleTheme}
            className="sidebar-icon"
            title={theme === "light" ? "Dark Mode" : "Light Mode"}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link
            href="https://github.com/beajousama"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-icon"
            title="GitHub"
          >
            <Github size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/ousama-beaj/"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-icon"
            title="LinkedIn"
          >
            <Linkedin size={20} />
          </Link>
          <Link href="mailto:beajousama@gmail.com" className="sidebar-icon" title="Gmail">
            <Mail size={20} />
          </Link>
        </div>
      </header>

      {/* Fixed Logo Top Right - Desktop and Tablet with responsive sizing */}
      <div className="hidden md:block fixed pixel-border z-60 bg-background p-2 top-4 right-4 md:top-2 md:right-2" style={{ zIndex: 9999 }}>
        <svg className="w-[clamp(100px,12vw,220px)] h-[clamp(100px,12vw,220px)]" viewBox="0 0 532 360" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base dark circle */}
          <path d="M180 32C261.738 32 328 98.2619 328 180C328 261.738 261.738 328 180 328C98.2619 328 32 261.738 32 180C32 98.2619 98.2619 32 180 32Z" stroke={theme === "dark" ? "#5f052d" : "#5f052d"} strokeWidth="64" />

          {/* Rotating beige quarter circle - spinner effect */}
          <g style={{ transformOrigin: "180px 180px", transform: `rotate(${scrollProgress * 360}deg)` }}>
            <circle
              cx="180"
              cy="180"
              r="148"
              stroke={theme === "dark" ? "#C7CACC" : "#fff"}
              strokeWidth="64"
              fill="none"
              strokeDasharray="233 930"
              style={{ transition: "transform 0.05s linear" }}
            />
          </g>

          {/* Logo shape */}
          <path d="M265.948 10.6237C261.88 8.97487 267.158 8.8648 342.921 9.08465C342.951 9.08462 421.615 9.00034 425.571 9.5407C429.525 10.0812 430.751 10.0808 434.468 11.1618C467.346 20.7251 490.929 45.6891 502.475 81.194C507.203 95.8137 507.752 115.49 504.014 132.198C501.265 144.509 493.788 160.008 485.761 169.681C483.671 172.21 482.021 174.628 482.021 174.958C482.022 175.398 484.991 178.695 488.619 182.432C504.893 198.921 515.23 221.894 516.77 244.978C519.848 290.046 491.809 334.235 450.573 349.295C432.1 356 432.759 356 342.921 356C292.998 356 261 355.56 261 355.01C261.001 354.461 262.1 353.582 263.529 353.142C269.028 351.493 287.501 341.71 296.737 335.554C308.173 328.08 327.527 309.283 334.784 298.841L339.732 291.695L382.067 291.146L424.292 290.596L431.77 286.968C439.797 283.011 443.975 278.504 448.264 269.161C450.133 265.204 450.573 261.906 450.573 253.222C450.683 243 450.352 241.681 447.054 234.866C442.325 225.193 433.969 217.498 424.622 214.31C418.574 212.222 415.275 212.002 395.482 212.002H373.16L373.93 202.878C375.359 188.148 374.7 159.459 372.94 152.973L371.291 147.258L392.844 146.927C417.475 146.598 420.444 145.718 429.681 136.705C448.154 118.787 443.865 88.9978 420.993 77.0163L415.495 74.0485L377.889 73.4987L340.282 72.9499L334.784 65.0348C327.747 55.0319 308.723 36.1251 297.617 28.2106C289.26 22.165 274.855 14.1413 265.948 10.6237Z" fill={theme === "dark" ? "#5f052d" : "#5f052d"} />
        </svg>
      </div>

      {/* Language Switcher - Desktop (Top Left) */}
      <div className="hidden md:block fixed top-4 left-[280px] pixel-border bg-background z-50" style={{ zIndex: 9999 }}>
        <div className="flex">
          <button
            onClick={() => setLanguage("en")}
            className={`pixel-text font-bold transition-colors ${
              language === "en" 
                ? "bg-accent text-accent-foreground" 
                : "bg-card text-foreground hover:bg-muted"
            }`}
            style={{ padding: "clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)", borderRight: "3px solid var(--foreground)", fontSize: "clamp(0.65rem, 1vw, 0.75rem)" }}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("fr")}
            className={`pixel-text font-bold transition-colors ${
              language === "fr" 
                ? "bg-accent text-accent-foreground" 
                : "bg-card text-foreground hover:bg-muted"
            }`}
            style={{ padding: "clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)", fontSize: "clamp(0.65rem, 1vw, 0.75rem)" }}
          >
            FR
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          main {
            margin-top: 100px;
          }
        }
      `}</style>
    </>
  )
}
