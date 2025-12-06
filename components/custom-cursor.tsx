"use client"

import { is } from "date-fns/locale"
import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hoverSize, setHoverSize] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      const isClickable = target.closest("a, button, [role='button'], .retro-button, .sidebar-icon, .social-icon")

      if (isClickable) {
        const rect = isClickable.getBoundingClientRect()
        setIsHovering(true)
        setHoverSize({
          width: rect.width + 16,
          height: rect.height + 16,
        })
        setPosition({ 
          x: rect.left + rect.width / 2, 
          y: rect.top + rect.height / 2 
        })
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", updateCursor)

    
    return () => {
      window.removeEventListener("mousemove", updateCursor)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Don't render cursor on mobile
  if (isMobile) return null

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovering ? `${hoverSize.width}px` : "24px",
          height: isHovering ? `${hoverSize.height}px` : "24px",
        }}
      />
      <style jsx>{`
        .custom-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          transition: width 0.2s ease, height 0.2s ease;
          border: 3px solid var(--accent);
          background: transparent;
          box-shadow: 
            inset 0 0 0 2px var(--background),
            0 0 0 1px var(--foreground);
        }
        
        .custom-cursor::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          background: var(--accent);
          border: 1px solid var(--foreground);
        }
      `}</style>
    </>
  )
}
