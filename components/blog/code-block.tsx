"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "@/contexts/ThemeContext"

// Map Sanity language values to prism language identifiers
const LANG_MAP: Record<string, string> = {
  typescript: "typescript",
  javascript: "javascript",
  tsx: "tsx",
  jsx: "jsx",
  bash: "bash",
  shell: "bash",
  css: "css",
  html: "markup",
  json: "json",
  python: "python",
  sql: "sql",
  text: "text",
}

// Warm beige theme for light mode — same palette as the portfolio
// Use backgroundColor only (no background) to avoid React style conflict with react-syntax-highlighter
const warmBeige: Record<string, React.CSSProperties> = {
  ...vs,
  'pre[class*="language-"]': {
    ...((vs as any)['pre[class*="language-"]'] ?? {}),
    background: undefined,
    backgroundColor: "var(--code-bg)",
    margin: 0,
    padding: "1rem",
    overflow: "auto",
  },
  'code[class*="language-"]': {
    ...((vs as any)['code[class*="language-"]'] ?? {}),
    background: undefined,
    backgroundColor: "transparent",
    color: "var(--code-fg)",
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
  },
}

const darkTheme: Record<string, React.CSSProperties> = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...((vscDarkPlus as any)['pre[class*="language-"]'] ?? {}),
    background: undefined,
    backgroundColor: "var(--code-bg)",
    margin: 0,
    padding: "1rem",
    overflow: "auto",
  },
  'code[class*="language-"]': {
    ...((vscDarkPlus as any)['code[class*="language-"]'] ?? {}),
    background: undefined,
    backgroundColor: "transparent",
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
  },
}

type Props = {
  code: string
  language?: string
  filename?: string
}

export default function CodeBlock({ code, language = "text", filename }: Props) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const lang = LANG_MAP[language] ?? "text"
  const activeTheme = isDark ? darkTheme : warmBeige

  return (
    <div
      className="my-6 overflow-hidden rounded border-2 border-border"
      style={{ background: "var(--code-bg)" }}
    >
      {/* Header bar */}
      {(language !== "text" || filename) && (
        <div
          className="flex items-center justify-between border-b border-border px-4 py-2"
          style={{ background: "var(--code-header-bg)" }}
        >
          {filename && (
            <span
              className="pixel-text text-xs"
              style={{ color: "var(--code-fg)", opacity: 0.6 }}
            >
              {filename}
            </span>
          )}
          {language && language !== "text" && (
            <span
              className="ml-auto pixel-text text-xs uppercase tracking-widest"
              style={{ color: "var(--code-accent)" }}
            >
              {language}
            </span>
          )}
        </div>
      )}

      {/* Highlighted code */}
      <SyntaxHighlighter
        language={lang}
        style={activeTheme}
        customStyle={{
          margin: 0,
          backgroundColor: "var(--code-bg)",
          fontSize: "0.8rem",
          lineHeight: "1.65",
        }}
        codeTagProps={{
          style: {
            fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
          },
        }}
      >
        {code ?? ""}
      </SyntaxHighlighter>
    </div>
  )
}
