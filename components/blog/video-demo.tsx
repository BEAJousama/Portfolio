"use client"

import { useRef, useEffect } from "react"
import type { VideoDemo as VideoDemoType } from "@/lib/blog/types"

function getEmbedUrl(url: string): { type: "youtube" | "vimeo" | "direct" | "unknown"; embedUrl: string } {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  if (ytMatch) {
    return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}` }
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return { type: "vimeo", embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}` }
  }

  // Direct video file
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
    return { type: "direct", embedUrl: url }
  }

  return { type: "unknown", embedUrl: url }
}

type Props = {
  video: VideoDemoType
}

export default function VideoDemo({ video }: Props) {
  // Prefer uploaded file, then external URL
  const sourceUrl = video?.fileUrl ?? video?.url
  if (!sourceUrl) return null

  // Uploaded file: always use direct <video>
  if (video.fileUrl) {
    return (
      <VideoPlayer src={video.fileUrl} caption={video.caption} />
    )
  }

  const { type, embedUrl } = getEmbedUrl(video.url!)

  if (type === "direct") {
    return (
      <VideoPlayer src={embedUrl} caption={video.caption} />
    )
  }

  return (
    <div className="my-8">
      {type === "youtube" || type === "vimeo" ? (
        <div className="pixel-border overflow-hidden bg-card">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={embedUrl}
              title={video.caption ?? "Demo video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      ) : (
        <div className="pixel-border overflow-hidden bg-card">
          <div className="p-4">
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-text text-sm text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              ▶ Watch demo video
            </a>
          </div>
        </div>
      )}
      {video.caption && (
        <p className="pixel-text mt-2 text-center text-xs text-muted-foreground">
          {video.caption}
        </p>
      )}
    </div>
  )
}

function VideoPlayer({ src, caption }: { src: string; caption?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    const play = () => el.play().catch(() => {})
    play()
    el.addEventListener("loadeddata", play)
    return () => el.removeEventListener("loadeddata", play)
  }, [src])

  return (
    <div className="my-8">
      <div className="pixel-border overflow-hidden bg-card">
        <video
          ref={videoRef}
          src={src}
          className="w-full"
          preload="auto"
          loop
          muted
          playsInline
          autoPlay
        />
      </div>
      {caption && (
        <p className="pixel-text mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  )
}
