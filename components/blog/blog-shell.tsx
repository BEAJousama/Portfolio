"use client"

import type { ReactNode } from "react"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { SoundProvider } from "@/contexts/SoundContext"
import ParticlesBackground from "@/components/particles-background"
import CustomCursor from "@/components/custom-cursor"
import BlogHeader from "@/components/blog/blog-header"
import BackgroundMusic from "@/components/background-music"

type BlogShellProps = {
  children: ReactNode
}

export default function BlogShell({ children }: BlogShellProps) {
  return (
    <SoundProvider>
      <ThemeProvider>
        <LanguageProvider>
          <div className="min-h-dvh bg-background text-foreground">
            <ParticlesBackground />
            <CustomCursor />
            <BackgroundMusic />
            <BlogHeader />
            <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 pt-28 md:px-8 md:pt-32">
              {children}
            </main>
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </SoundProvider>
  )
}
