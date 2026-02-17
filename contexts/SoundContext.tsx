"use client"

import { createContext, useContext, useEffect, useState } from "react"

type SoundContextType = {
  uiSoundEnabled: boolean
  toggleUiSound: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [uiSoundEnabled, setUiSoundEnabled] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = localStorage.getItem("uiSoundEnabled")
    if (saved !== null) {
      setUiSoundEnabled(saved === "true")
    }
  }, [])

  const toggleUiSound = () => {
    setUiSoundEnabled(prev => {
      const next = !prev
      if (typeof window !== "undefined") {
        localStorage.setItem("uiSoundEnabled", String(next))
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

