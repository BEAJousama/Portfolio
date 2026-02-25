"use client"

import { PortableText } from "@portabletext/react"
import type { PortableTextBlock } from "@/lib/blog/types"
import { slugify } from "@/lib/blog/toc"

const components = {
  block: {
    normal: ({ children }: any) => (
      <p className="pixel-text mb-4 text-sm leading-7 md:text-[0.98rem] md:leading-8">{children}</p>
    ),
    h2: ({ children, value }: any) => {
      const id = slugify(value?.children?.map((s: any) => s.text ?? "").join("") ?? "")
      return (
        <h2 id={id} className="game-title mt-10 mb-4 scroll-mt-24 text-lg md:text-2xl border-b-2 border-accent pb-2">
          {children}
        </h2>
      )
    },
    h3: ({ children, value }: any) => {
      const id = slugify(value?.children?.map((s: any) => s.text ?? "").join("") ?? "")
      return (
        <h3 id={id} className="game-title mt-8 mb-3 scroll-mt-24 text-base md:text-xl">
          {children}
        </h3>
      )
    },
    h4: ({ children, value }: any) => {
      const id = slugify(value?.children?.map((s: any) => s.text ?? "").join("") ?? "")
      return (
        <h4 id={id} className="pixel-text mt-6 mb-2 scroll-mt-24 text-sm font-bold uppercase tracking-widest text-accent md:text-base">
          {children}
        </h4>
      )
    },
    blockquote: ({ children }: any) => (
      <blockquote className="pixel-text my-6 border-l-4 border-accent bg-muted px-5 py-3 text-sm italic text-muted-foreground md:text-base">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="pixel-text mb-4 ml-5 list-disc space-y-1 text-sm md:text-[0.98rem]">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="pixel-text mb-4 ml-5 list-decimal space-y-1 text-sm md:text-[0.98rem]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-7">{children}</li>,
    number: ({ children }: any) => <li className="leading-7">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-muted-foreground">{children}</em>,
    underline: ({ children }: any) => <span className="underline underline-offset-4">{children}</span>,
    "strike-through": ({ children }: any) => <span className="line-through opacity-60">{children}</span>,
    code: ({ children }: any) => (
      <code className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-accent">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?.url && !value?.asset?._ref) return null
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value.asset?.url ?? ""}
            alt={value.alt ?? ""}
            className="pixel-border w-full rounded object-cover"
          />
          {value.caption && (
            <figcaption className="pixel-text mt-2 text-center text-xs text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    codeBlock: ({ value }: any) => (
      <div className="my-6 overflow-hidden rounded border-2 border-border">
        {(value.language || value.filename) && (
          <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
            {value.filename && (
              <span className="pixel-text text-xs text-muted-foreground">{value.filename}</span>
            )}
            {value.language && (
              <span className="ml-auto pixel-text text-xs uppercase tracking-widest text-accent">
                {value.language}
              </span>
            )}
          </div>
        )}
        <pre className="overflow-x-auto bg-card p-4 text-xs leading-6 md:text-sm">
          <code className="font-mono text-foreground whitespace-pre">{value.code}</code>
        </pre>
      </div>
    ),
  },
}

type Props = {
  body: PortableTextBlock[]
}

export default function PortableTextRenderer({ body }: Props) {
  if (!body?.length) {
    return (
      <p className="pixel-text text-sm text-muted-foreground">
        Article body is empty. Add Portable Text content in Sanity for this post.
      </p>
    )
  }

  return (
    <div className="portable-text">
      <PortableText value={body as any} components={components} />
    </div>
  )
}
