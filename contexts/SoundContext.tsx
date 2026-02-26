"use client"

import { createContext, useContext, useEffect, useState } from "react"

type SoundContextType = {
  uiSoundEnabled: boolean
  toggleUiSound: () => void
}

const STORAGE_KEY = "uiSoundEnabled_v2"

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Start with sounds off by default; user explicitly opts in.
  const [uiSoundEnabled, setUiSoundEnabled] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      setUiSoundEnabled(saved === "true")
    }
  }, [])

  const toggleUiSound = () => {
    setUiSoundEnabled(prev => {
      const next = !prev
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, String(next))
      }
      return next
    })
  }

  return (
    <SoundContext.Provider value={{ uiSoundEnabled, toggleUiSound }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSoundSettings() {
  const ctx = useContext(SoundContext)
  if (!ctx) {
    throw new Error("useSoundSettings must be used within SoundProvider")
  }
  return ctx
}

