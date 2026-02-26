"use client"

import { useEffect } from "react"
import { useSoundSettings } from "@/contexts/SoundContext"

// Module-level singleton — one Audio object for the entire app lifetime,
// shared across portfolio and blog regardless of how many times the
// component mounts/unmounts during navigation.
let bgAudio: HTMLAudioElement | null = null

function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null
  if (!bgAudio) {
    bgAudio = new Audio("/music.mp3")
    bgAudio.loop = true
    bgAudio.volume = 0.04
  }
  return bgAudio
}

export default function BackgroundMusic() {
  const { uiSoundEnabled } = useSoundSettings()

  useEffect(() => {
    const audio = getAudio()
    if (!audio) return

    const tryPlay = () => {
      if (!uiSoundEnabled) return
      if (!audio.paused) return
      audio.play().catch(() => {
        // Browser blocked autoplay — will try again on next interaction
      })
    }

    if (uiSoundEnabled) {
      tryPlay()
      window.addEventListener("pointerdown", tryPlay)
      window.addEventListener("keydown", tryPlay)
    } else {
      audio.pause()
    }

    return () => {
      window.removeEventListener("pointerdown", tryPlay)
      window.removeEventListener("keydown", tryPlay)
    }
  }, [uiSoundEnabled])

  return null
}

