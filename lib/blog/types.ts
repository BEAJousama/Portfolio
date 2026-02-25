export type PortableTextSpan = {
  _key?: string
  _type: "span"
  text: string
  marks?: string[]
}

export type PortableTextBlock =
  | {
      _key?: string
      _type: "block"
      style?: "normal" | "h2" | "h3" | "h4" | "blockquote"
      listItem?: "bullet" | "number"
      level?: number
      children?: PortableTextSpan[]
      markDefs?: { _key: string; _type: string; href?: string; blank?: boolean }[]
    }
  | {
      _key?: string
      _type: "image"
      asset?: { _ref?: string; url?: string }
      alt?: string
      caption?: string
    }
  | {
      _key?: string
      _type: "codeBlock"
      language?: string
      filename?: string
      code?: string
    }

export interface Category {
  _id: string
  title: string
  slug: string
  description?: string
  color?: string
  icon?: string
}

export interface Technology {
  _id: string
  name: string
  slug: string
  description?: string
  category?: string
  website?: string
}

export interface Author {
  _id: string
  name: string
  slug: string
  role?: string
  bio?: string
  avatar?: string
  social?: {
    github?: string
    twitter?: string
    linkedin?: string
    website?: string
  }
}

export interface VideoDemo {
  /** Direct link (YouTube, Vimeo, or .mp4/.webm URL) */
  url?: string
  /** Resolved URL when video is uploaded to Sanity */
  fileUrl?: string
  caption?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  author?: Author
  categories?: Category[]
  technologies?: Technology[]
  publishedAt: string
  readingTime?: number
  tags: string[]
  coverImage?: string
  body: PortableTextBlock[]
  videoDemo?: VideoDemo
  isFeatured?: boolean
  seoTitle?: string
  seoDescription?: string
}

export interface TutorialStep {
  _key: string
  title: string
  description?: string
  content: PortableTextBlock[]
  duration?: number
}

export interface Tutorial {
  _id: string
  title: string
  slug: string
  description: string
  author?: Author
  categories?: Category[]
  technologies?: Technology[]
  difficulty: "beginner" | "intermediate" | "advanced"
  totalDuration?: number
  publishedAt: string
  prerequisites?: { title: string; link?: string }[]
  learningOutcomes?: string[]
  coverImage?: string
  videoDemo?: VideoDemo
  introduction?: PortableTextBlock[]
  steps: TutorialStep[]
  conclusion?: PortableTextBlock[]
  tags: string[]
  isFeatured?: boolean
}

export type BlogSource = "sanity" | "mock"
