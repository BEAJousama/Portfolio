let _k = 0
const key = () => `k${(_k++).toString(36)}`

// ─── Types ────────────────────────────────────────────────────────────────────

type Span = { _type: "span"; _key: string; text: string; marks: string[] }
type MarkDef = { _type: string; _key: string; href?: string; blank?: boolean }

type TextBlock = {
  _type: "block"
  _key: string
  style: string
  children: Span[]
  markDefs: MarkDef[]
  listItem?: "bullet" | "number"
  level?: number
}

type CodeBlock = {
  _type: "codeBlock"
  _key: string
  language: string
  code: string
  filename?: string
}

export type PortableTextBlock = TextBlock | CodeBlock

export type Frontmatter = {
  title?: string
  excerpt?: string
  tags?: string[]
  publishedAt?: string
  readingTime?: number
  seoTitle?: string
  seoDescription?: string
  isFeatured?: boolean
}

// ─── Inline parser ────────────────────────────────────────────────────────────

function parseSpans(text: string, marks: string[], markDefs: MarkDef[]): Span[] {
  if (!text) return []

  // Links — must come first to avoid interfering with other patterns
  const linkMatch = text.match(/\[([^\]]+)\]\(([^)]+)\)/)
  if (linkMatch) {
    const linkKey = key()
    markDefs.push({ _type: "link", _key: linkKey, href: linkMatch[2], blank: true })
    const idx = text.indexOf(linkMatch[0])
    return [
      ...parseSpans(text.slice(0, idx), marks, markDefs),
      ...parseSpans(linkMatch[1], [...marks, linkKey], markDefs),
      ...parseSpans(text.slice(idx + linkMatch[0].length), marks, markDefs),
    ]
  }

  // Bold (**text**)
  const boldMatch = text.match(/\*\*([^*\n]+)\*\*/)
  if (boldMatch) {
    const idx = text.indexOf(boldMatch[0])
    return [
      ...parseSpans(text.slice(0, idx), marks, markDefs),
      ...parseSpans(boldMatch[1], [...marks, "strong"], markDefs),
      ...parseSpans(text.slice(idx + boldMatch[0].length), marks, markDefs),
    ]
  }

  // Italic (*text*)
  const italicMatch = text.match(/\*([^*\n]+)\*/)
  if (italicMatch) {
    const idx = text.indexOf(italicMatch[0])
    return [
      ...parseSpans(text.slice(0, idx), marks, markDefs),
      ...parseSpans(italicMatch[1], [...marks, "em"], markDefs),
      ...parseSpans(text.slice(idx + italicMatch[0].length), marks, markDefs),
    ]
  }

  // Inline code (`text`)
  const codeMatch = text.match(/`([^`\n]+)`/)
  if (codeMatch) {
    const idx = text.indexOf(codeMatch[0])
    return [
      ...parseSpans(text.slice(0, idx), marks, markDefs),
      ...parseSpans(codeMatch[1], [...marks, "code"], markDefs),
      ...parseSpans(text.slice(idx + codeMatch[0].length), marks, markDefs),
    ]
  }

  return [{ _type: "span", _key: key(), text, marks }]
}

// ─── Block parser ─────────────────────────────────────────────────────────────

function isBlockBoundary(line: string): boolean {
  return (
    line.trim() === "" ||
    /^#{1,4}\s/.test(line) ||
    line.startsWith("```") ||
    line.startsWith("> ") ||
    /^[-*+]\s/.test(line) ||
    /^\d+\.\s/.test(line)
  )
}

export function mdToPortableText(markdown: string): PortableTextBlock[] {
  _k = 0
  const blocks: PortableTextBlock[] = []
  const lines = markdown.split("\n")
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Blank line
    if (line.trim() === "") { i++; continue }

    // Fenced code block
    if (line.startsWith("```")) {
      const langPart = line.slice(3).trim()
      const spaceIdx = langPart.indexOf(" ")
      const language = spaceIdx !== -1 ? langPart.slice(0, spaceIdx) : langPart || "text"
      const filename = spaceIdx !== -1 ? langPart.slice(spaceIdx + 1) : undefined
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      blocks.push({
        _type: "codeBlock",
        _key: key(),
        language,
        code: codeLines.join("\n"),
        ...(filename ? { filename } : {}),
      })
      continue
    }

    // Heading (h1→h2, h2→h2, h3→h3, h4→h4 — schema only has h2–h4)
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const styleMap: Record<number, string> = { 1: "h2", 2: "h2", 3: "h3", 4: "h4" }
      const markDefs: MarkDef[] = []
      blocks.push({
        _type: "block",
        _key: key(),
        style: styleMap[level] ?? "h4",
        children: parseSpans(headingMatch[2].trim(), [], markDefs),
        markDefs,
      })
      i++
      continue
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const markDefs: MarkDef[] = []
      blocks.push({
        _type: "block",
        _key: key(),
        style: "blockquote",
        children: parseSpans(line.slice(2).trim(), [], markDefs),
        markDefs,
      })
      i++
      continue
    }

    // Bullet list item
    const bulletMatch = line.match(/^[-*+]\s+(.+)/)
    if (bulletMatch) {
      const markDefs: MarkDef[] = []
      blocks.push({
        _type: "block",
        _key: key(),
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: parseSpans(bulletMatch[1].trim(), [], markDefs),
        markDefs,
      })
      i++
      continue
    }

    // Numbered list item
    const numberedMatch = line.match(/^\d+\.\s+(.+)/)
    if (numberedMatch) {
      const markDefs: MarkDef[] = []
      blocks.push({
        _type: "block",
        _key: key(),
        style: "normal",
        listItem: "number",
        level: 1,
        children: parseSpans(numberedMatch[1].trim(), [], markDefs),
        markDefs,
      })
      i++
      continue
    }

    // Paragraph — collect consecutive non-block lines
    const paraLines: string[] = []
    while (i < lines.length && !isBlockBoundary(lines[i])) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length > 0) {
      const markDefs: MarkDef[] = []
      blocks.push({
        _type: "block",
        _key: key(),
        style: "normal",
        children: parseSpans(paraLines.join(" "), [], markDefs),
        markDefs,
      })
    }
  }

  return blocks
}

// ─── Frontmatter parser ───────────────────────────────────────────────────────

export function parseFrontmatter(content: string): { data: Frontmatter; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: content }

  const data: Frontmatter = {}
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":")
    if (colonIdx === -1) continue
    const k = line.slice(0, colonIdx).trim()
    const raw = line.slice(colonIdx + 1).trim()
    if (!k || !raw) continue

    if (raw.startsWith("[")) {
      ;(data as Record<string, unknown>)[k] = raw
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean)
    } else if (raw === "true" || raw === "false") {
      ;(data as Record<string, unknown>)[k] = raw === "true"
    } else if (raw !== "" && !isNaN(Number(raw))) {
      ;(data as Record<string, unknown>)[k] = Number(raw)
    } else {
      ;(data as Record<string, unknown>)[k] = raw.replace(/^['"]|['"]$/g, "")
    }
  }

  return { data, body: match[2] }
}

// ─── Slug helper ──────────────────────────────────────────────────────────────

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
}
