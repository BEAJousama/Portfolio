"use client"

import { useState, useRef, useEffect } from "react"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
}

export default function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detect if URL is YouTube
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be')
  
  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('watch?v=')[1].split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (videoRef.current) {
      videoRef.current.volume = vol
    }
    if (vol === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
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
      {isYouTube ? (
        // YouTube iframe embed
        <iframe
          className="w-full h-full"
          src={getEmbedUrl(src)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: "none" }}
        />
      ) : (
        // Custom video player for direct video sources
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-full"
            onClick={togglePlay}
          />

          {/* Custom Play Button Overlay */}
          {!isPlaying && (
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
                    max="1"
                    step="0.1"
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
        </>
      )}
    </div>
  )
}
