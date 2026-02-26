"use client"

import { useCallback, useRef } from "react"

let audioContext: AudioContext | null = null

function getAudioContext() {
  if (typeof window === "undefined") return null
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioContext
}

function playBeep(options: { frequency: number; duration: number; volume?: number; type?: OscillatorType }) {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = options.type ?? "sine"
  osc.frequency.setValueAtTime(options.frequency, now)

  const volume = options.volume ?? 0.2
  gain.gain.setValueAtTime(volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + options.duration)

  osc.connect(gain)
  gain.connect(ctx.destination)

  // Ensure context is running (required on some browsers)
  if (ctx.state === "suspended") {
    ctx.resume().then(() => {
      osc.start(now)
      osc.stop(now + options.duration)
    })
  } else {
    osc.start(now)
    osc.stop(now + options.duration)
  }
}

export function useSound() {
  const interactedRef = useRef(false)

  const ensureContext = useCallback(() => {
    const ctx = getAudioContext()
    if (!ctx) return
    if (!interactedRef.current && ctx.state === "suspended") {
      ctx.resume().catch(() => {})
    }
    interactedRef.current = true
  }, [])

  const playClick = useCallback(() => {
    ensureContext()
    // Very soft, smooth click (quieter than background music)
    playBeep({ frequency: 320, duration: 0.05, volume: 0.01, type: "sine" })
  }, [ensureContext])

  const playCollect = useCallback(() => {
    ensureContext()
    playBeep({ frequency: 660, duration: 0.12, volume: 0.01, type: "triangle" })
  }, [ensureContext])

  const playGameOver = useCallback(() => {
    ensureContext()
    // Two quick descending beeps
    playBeep({ frequency: 260, duration: 0.12, volume: 0.03, type: "sawtooth" })
    setTimeout(() => {
      playBeep({ frequency: 180, duration: 0.18, volume: 0.025, type: "sawtooth" })
    }, 120)
  }, [ensureContext])

  const playWin = useCallback(() => {
    ensureContext()
    // Simple ascending "win" chirp
    playBeep({ frequency: 400, duration: 0.1, volume: 0.025, type: "triangle" })
    setTimeout(() => playBeep({ frequency: 520, duration: 0.1, volume: 0.025, type: "triangle" }), 100)
    setTimeout(() => playBeep({ frequency: 660, duration: 0.16, volume: 0.025, type: "triangle" }), 200)
  }, [ensureContext])

  const playScrollTick = useCallback(() => {
    ensureContext()
    // Extremely soft, subtle tick for scroll – below music level
    playBeep({ frequency: 420, duration: 0.025, volume: 0.0035, type: "sine" })
  }, [ensureContext])

  return { playClick, playCollect, playGameOver, playWin, playScrollTick }
}

