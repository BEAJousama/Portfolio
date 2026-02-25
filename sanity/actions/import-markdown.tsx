"use client"

import { useCallback, useRef, useState } from "react"
import { type DocumentActionProps, useDocumentOperation } from "sanity"
import { UploadIcon } from "@sanity/icons"
import { mdToPortableText, parseFrontmatter, slugify } from "../lib/md-to-portable-text"

export function ImportMarkdownAction(props: DocumentActionProps) {
  const { id, type } = props
  const { patch } = useDocumentOperation(id, type)

  const [showDialog, setShowDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const reset = useCallback(() => {
    setError(null)
    setSuccess(null)
    setIsProcessing(false)
    if (fileRef.current) fileRef.current.value = ""
  }, [])

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setIsProcessing(true)
      setError(null)
      setSuccess(null)

      const reader = new FileReader()

      reader.onload = (event) => {
        try {
          const raw = event.target?.result as string
          const { data, body } = parseFrontmatter(raw)
          const ptBody = mdToPortableText(body)

          const fields: Record<string, unknown> = {}

          if (data.title) {
            fields.title = data.title
            fields.slug = { _type: "slug", current: slugify(data.title) }
          }
          if (data.excerpt) fields.excerpt = data.excerpt
          if (data.tags?.length) fields.tags = data.tags
          if (data.publishedAt) fields.publishedAt = data.publishedAt
          if (data.readingTime) fields.readingTime = data.readingTime
          if (data.seoTitle) fields.seoTitle = data.seoTitle
          if (data.seoDescription) fields.seoDescription = data.seoDescription
          if (typeof data.isFeatured === "boolean") fields.isFeatured = data.isFeatured
          if (ptBody.length > 0) fields.body = ptBody

          if (Object.keys(fields).length === 0) {
            setError("No content found — make sure the file has frontmatter or body text.")
            setIsProcessing(false)
            return
          }

          patch.execute([{ set: fields }])

          const summary = [
            data.title && `title`,
            data.excerpt && `excerpt`,
            data.tags?.length && `tags (${data.tags.length})`,
            ptBody.length && `${ptBody.length} content blocks`,
          ]
            .filter(Boolean)
            .join(", ")

          setSuccess(`Imported: ${summary}`)
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to parse the file.")
        } finally {
          setIsProcessing(false)
        }
      }

      reader.onerror = () => {
        setError("Could not read the file.")
        setIsProcessing(false)
      }

      reader.readAsText(file)
    },
    [patch],
  )

  // Only show on post documents
  if (type !== "post") return null

  return {
    label: "Import Markdown",
    icon: UploadIcon,
    onHandle: () => {
      reset()
      setShowDialog(true)
    },
    dialog: showDialog
      ? {
          type: "dialog" as const,
          id: "import-markdown-dialog",
          header: "Import from Markdown",
          onClose: () => {
            setShowDialog(false)
            reset()
          },
          content: (
            <div
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                maxWidth: "560px",
              }}
            >
              {/* Description */}
              <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6" }}>
                Upload a <code>.md</code> file. Frontmatter fields are mapped automatically — the
                markdown body is converted to Portable Text blocks.
              </p>

              {/* Frontmatter reference */}
              <div>
                <p style={{ margin: "0 0 0.5rem", fontSize: "12px", fontWeight: 600, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Supported frontmatter
                </p>
                <pre
                  style={{
                    background: "rgba(0,0,0,0.06)",
                    borderRadius: "6px",
                    padding: "0.875rem 1rem",
                    fontSize: "12px",
                    margin: 0,
                    lineHeight: "1.7",
                    overflowX: "auto",
                  }}
                >
                  {`---
title: "My Post Title"
excerpt: "A short description shown on the listing page."
tags: [react, nextjs, typescript]
publishedAt: 2026-02-25
readingTime: 5
isFeatured: false
seoTitle: "Optional SEO override"
seoDescription: "Optional SEO description"
---

## Your content here

Paragraphs, **bold**, *italic*, \`inline code\`,
[links](https://example.com), lists, code blocks...`}
                </pre>
              </div>

              {/* File input */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label
                  htmlFor="md-upload"
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  Select file
                </label>
                <input
                  id="md-upload"
                  ref={fileRef}
                  type="file"
                  accept=".md,.markdown"
                  onChange={handleFile}
                  disabled={isProcessing}
                  style={{ fontSize: "14px" }}
                />
              </div>

              {/* Status messages */}
              {isProcessing && (
                <p style={{ margin: 0, fontSize: "13px", opacity: 0.6 }}>Processing…</p>
              )}
              {error && (
                <p style={{ margin: 0, fontSize: "13px", color: "#e05353", fontWeight: 500 }}>
                  ✗ {error}
                </p>
              )}
              {success && (
                <p style={{ margin: 0, fontSize: "13px", color: "#2e7d52", fontWeight: 500 }}>
                  ✓ {success}. Review the fields above and publish when ready.
                </p>
              )}
            </div>
          ),
        }
      : undefined,
  }
}
