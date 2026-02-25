import type { PortableTextBlock } from "@/lib/blog/types"

function extractPlainText(blocks: PortableTextBlock[]): string {
  return blocks
    .map((block) => {
      if (block._type === "block") {
        return block.children?.map((child) => child.text).join("") ?? ""
      }
      if (block._type === "codeBlock") {
        return block.code ?? ""
      }
      return ""
    })
    .filter(Boolean)
    .join(" ")
}

export function estimateReadingTimeMinutes(
  excerpt: string,
  blocks: PortableTextBlock[],
  wordsPerMinute = 200,
): number {
  const bodyText = extractPlainText(blocks)
  const wordCount = `${excerpt} ${bodyText}`.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}
