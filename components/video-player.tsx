"use client"

import { useState, useRef, useEffect } from "react"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
}

// Extend window to include YouTube IFrame API
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(100)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerDivRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('watch?v=')[1].split('&')[0]
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0]
    }
    return null
  }

  const videoId = getYouTubeVideoId(src)

  // Load YouTube IFrame API
  useEffect(() => {
    if (!videoId) return

    // Load YouTube IFrame API script
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    // Initialize player when API is ready
    const initPlayer = () => {
      if (window.YT && playerDivRef.current) {
        playerRef.current = new window.YT.Player(playerDivRef.current, {
          videoId: videoId,
          playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
          },
          events: {
            onReady: (event: any) => {
              setPlayerReady(true)
              setDuration(event.target.getDuration())
              setVolume(event.target.getVolume())
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true)
              } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false)
              }
            },
          },
        })
      }
    }

    if (window.YT && window.YT.Player) {
      initPlayer()
    } else {
      window.onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [videoId])

  // Update current time
  useEffect(() => {
    if (playerReady && playerRef.current && isPlaying) {
      intervalRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          setCurrentTime(playerRef.current.getCurrentTime())
        }
      }, 100)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [playerReady, isPlaying])

  const togglePlay = () => {
    if (!playerRef.current || !playerReady) return

    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (playerRef.current && playerReady) {
      playerRef.current.seekTo(time, true)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (playerRef.current && playerReady) {
      playerRef.current.setVolume(vol)
      if (vol === 0) {
        setIsMuted(true)
        playerRef.current.mute()
      } else {
        setIsMuted(false)
        playerRef.current.unMute()
      }
    }
  }

  const toggleMute = () => {
    if (!playerRef.current || !playerReady) return

    if (isMuted) {
      playerRef.current.unMute()
      setIsMuted(false)
      if (volume === 0) {
        setVolume(50)
        playerRef.current.setVolume(50)
      }
    } else {
      playerRef.current.mute()
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ aspectRatio: "16/9" }}
    >
      {/* YouTube Player */}
      <div ref={playerDivRef} className="w-full h-full" />

      {/* Custom Play Button Overlay */}
      {!isPlaying && playerReady && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="pixel-border bg-foreground/90 hover:bg-foreground transition-colors">
            <div className="flex items-center justify-center" style={{ width: "80px", height: "80px" }}>
              {/* Pixel-style play triangle */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-background">
                <path
                  d="M8 4 L8 28 L26 16 Z"
                  fill="currentColor"
                  strokeWidth="0"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Custom Controls */}
      {playerReady && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-muted accent-accent cursor-pointer"
              style={{
                appearance: "none",
                WebkitAppearance: "none",
              }}
            />
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 12px;
                height: 12px;
                background: var(--accent);
                cursor: pointer;
                border: 2px solid var(--background);
              }
              input[type="range"]::-moz-range-thumb {
                width: 12px;
                height: 12px;
                background: var(--accent);
                cursor: pointer;
                border: 2px solid var(--background);
              }
            `}</style>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="pixel-border pixel-text text-xs font-bold bg-foreground text-background hover:opacity-80"
                style={{ padding: "0.5rem 0.75rem" }}
              >
                {isPlaying ? "[||]" : "[▶]"}
              </button>

              {/* Time Display */}
              <span className="pixel-text text-xs text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="pixel-border pixel-text text-xs font-bold bg-foreground text-background hover:opacity-80"
                  style={{ padding: "0.5rem 0.75rem" }}
                >
                  {isMuted || volume === 0 ? "[MUTE]" : "[VOL]"}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-muted accent-accent cursor-pointer"
                />
              </div>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="pixel-border pixel-text text-xs font-bold bg-foreground text-background hover:opacity-80"
              style={{ padding: "0.5rem 0.75rem" }}
            >
              {isFullscreen ? "[◧]" : "[⛶]"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
