"use client"

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
  if (!video?.url) return null

  const { type, embedUrl } = getEmbedUrl(video.url)

  return (
    <div className="my-8">
      <div className="pixel-border overflow-hidden bg-card">
        {type === "direct" ? (
          <video
            src={embedUrl}
            controls
            className="w-full"
            preload="metadata"
          />
        ) : type === "youtube" || type === "vimeo" ? (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={embedUrl}
              title={video.caption ?? "Demo video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        ) : (
          // Fallback: unknown URL format — just link it
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
        )}
      </div>
      {video.caption && (
        <p className="pixel-text mt-2 text-center text-xs text-muted-foreground">
          {video.caption}
        </p>
      )}
    </div>
  )
}
