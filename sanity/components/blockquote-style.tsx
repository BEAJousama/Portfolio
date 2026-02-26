"use client"

import type React from "react"

/**
 * Custom blockquote style for Portable Text in Studio.
 * Uses blockquote > div so we never get <p> containing <div> (invalid HTML / hydration error).
 */
export default function BlockquoteStyle(props: { children?: React.ReactNode }) {
  return (
    <blockquote
      data-testid="text-style-blockquote"
      style={{
        margin: "0.5em 0",
        paddingLeft: "1em",
        borderLeft: "3px solid var(--card-border-color, #ccc)",
      }}
    >
      <div>{props.children}</div>
    </blockquote>
  )
}
