import type { PortableTextBlock } from "./types"

export interface TocHeading {
  id: string
  text: string
  level: 2 | 3 | 4
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function extractHeadings(body: PortableTextBlock[]): TocHeading[] {
  return body
    .filter(
      (block): block is Extract<PortableTextBlock, { _type: "block" }> =>
        block._type === "block" && ["h2", "h3", "h4"].includes(block.style ?? ""),
    )
    .map((block) => {
      const text = block.children?.map((s) => s.text).join("") ?? ""
      return {
        id: slugify(text),
        text,
        level: parseInt(block.style!.replace("h", ""), 10) as 2 | 3 | 4,
      }
    })
    .filter((h) => h.text.length > 0)
}
