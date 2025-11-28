"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Github, Linkedin } from "lucide-react"

export default function Header() {
  const [activeSection, setActiveSection] = useState("about")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

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
        className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground md:left-0 md:top-0 md:h-screen md:w-64 md:border-b-0 md:border-r-4 md:flex md:flex-col md:justify-between"
        style={{ padding: 0 }}
      >
        <div
          className="flex items-center justify-between border-b-4 border-foreground md:border-b-0 md:flex-col md:items-start md:gap-8"
          style={{ padding: "1rem" }}
        >
          <div className="md:w-full">
            <h1 className="game-title text-2xl md:text-xl" style={{ fontSize: "clamp(1.2rem, 4vw, 1.5rem)" }}>
              BEAJ Ousama
            </h1>
            <p className="pixel-text text-xs mt-1 text-foreground">Fullstack Dev</p>
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

        {/* Navigation */}
        <nav
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } md:block border-t-4 md:border-t-0 border-foreground md:space-y-6 space-y-4`}
          style={{ padding: "1rem" }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`block w-full text-left pixel-text text-sm font-bold ${
                activeSection === item.id ? "text-accent" : "text-foreground hover:text-accent"
              } transition-colors`}
            >
              &gt; {item.label}
            </button>
          ))}
        </nav>

        <div
          className="hidden md:flex border-t-4 border-foreground items-center justify-center"
          style={{ padding: "1.5rem", gap: "1.5rem" }}
        >
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
            href="https://linkedin.com/in/beajousama"
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
