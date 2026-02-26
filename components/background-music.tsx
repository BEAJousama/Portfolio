"use client"

import { useEffect, useRef } from "react"
import { useSoundSettings } from "@/contexts/SoundContext"

let audioContext: AudioContext | null = null
let gainNode: GainNode | null = null
let audioElement: HTMLAudioElement | null = null

function getAudio(): { ctx: AudioContext; gain: GainNode; el: HTMLAudioElement } | null {
  if (typeof window === "undefined") return null

  // Detect mobile for lower default volume
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const defaultVolume = isMobile ? 0.008 : 0.015 // Even lower on mobile

  if (!audioContext) {
    audioContext = new AudioContext()
    gainNode = audioContext.createGain()
    gainNode.gain.value = defaultVolume
    gainNode.connect(audioContext.destination)

    audioElement = new Audio("/music.mp3")
    audioElement.loop = true
    audioElement.volume = 1 // We control volume via GainNode

    // Connect audio element to AudioContext
    const source = audioContext.createMediaElementSource(audioElement)
    source.connect(gainNode)
  }

  return { ctx: audioContext!, gain: gainNode!, el: audioElement! }
}

export default function BackgroundMusic() {
  const { uiSoundEnabled } = useSoundSettings()
  const hasInteracted = useRef(false)

  useEffect(() => {
    const audio = getAudio()
    if (!audio) return

    const { ctx, gain, el } = audio

    const tryPlay = () => {
      if (!uiSoundEnabled) return

      // Resume AudioContext if suspended (required on mobile)
      if (ctx.state === "suspended") {
        ctx.resume()
      }

      if (el.paused) {
        el.play().catch(() => {
          // Browser blocked autoplay
        })
      }
    }

    if (uiSoundEnabled) {
      // Mobile browsers require user interaction before playing audio
      if (!hasInteracted.current) {
        const onInteraction = () => {
          hasInteracted.current = true
          tryPlay()
          window.removeEventListener("pointerdown", onInteraction)
          window.removeEventListener("keydown", onInteraction)
        }
        window.addEventListener("pointerdown", onInteraction)
        window.addEventListener("keydown", onInteraction)
      } else {
        tryPlay()
      }
    } else {
      el.pause()
    }
  }, [uiSoundEnabled])

  return null
}
