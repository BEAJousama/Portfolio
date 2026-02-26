import { createClient } from "next-sanity"
import { mockPosts } from "@/lib/blog/mock-posts"
import type { BlogPost, BlogSource, Tutorial } from "@/lib/blog/types"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-16"
const token = process.env.SANITY_API_READ_TOKEN

export const hasSanityConfig = Boolean(
  projectId && dataset && projectId !== "your_project_id",
)

const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token,
      perspective: "published",
    })
  : null

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readingTime,
  tags,
  isFeatured,
  "coverImage": coverImage.asset->url,
  "liveDemo": liveDemo{
    url,
    label,
    codeUrl,
    codeLabel
  },
  "videoDemo": select(
    videoDemo == null => null,
    {
      "fileUrl": videoDemo.file.asset->url,
      "url": videoDemo.url,
      "caption": videoDemo.caption
    }
  ),
  body,
  "author": author->{
    _id,
    name,
    slug,
    role,
    bio,
    "avatar": avatar.asset->url,
    social
  },
  "categories": categories[]->{
    _id,
    title,
    slug,
    description,
    color
  },
  "technologies": technologies[]->{
    _id,
    name,
    slug,
    description,
    category,
    website
  }
`

const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  ${postFields}
}`

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}`

const featuredPostsQuery = `*[_type == "post" && isFeatured == true && defined(slug.current)] | order(publishedAt desc) [0...3] {
  ${postFields}
}`

const tutorialFields = `
  _id,
  title,
  "slug": slug.current,
  description,
  difficulty,
  totalDuration,
  publishedAt,
  tags,
  isFeatured,
  "coverImage": coverImage.asset->url,
  "videoDemo": select(
    videoDemo == null => null,
    {
      "fileUrl": videoDemo.file.asset->url,
      "url": videoDemo.url,
      "caption": videoDemo.caption
    }
  ),
  introduction,
  steps,
  conclusion,
  prerequisites,
  learningOutcomes,
  "author": author->{
    _id,
    name,
    slug,
    role,
    bio,
    "avatar": avatar.asset->url
  },
  "categories": categories[]->{
    _id,
    title,
    slug,
    description,
    color
  },
  "technologies": technologies[]->{
    _id,
    name,
    slug,
    description,
    category,
    website
  }
`

const tutorialsQuery = `*[_type == "tutorial" && defined(slug.current)] | order(publishedAt desc) {
  ${tutorialFields}
}`

const tutorialBySlugQuery = `*[_type == "tutorial" && slug.current == $slug][0] {
  ${tutorialFields}
}`

const featuredTutorialsQuery = `*[_type == "tutorial" && isFeatured == true && defined(slug.current)] | order(publishedAt desc) [0...3] {
  ${tutorialFields}
}`

function sanitizePost(
  post: Partial<BlogPost> & Pick<BlogPost, "_id" | "title" | "slug">,
): BlogPost {
  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "No excerpt available.",
    publishedAt: post.publishedAt || new Date().toISOString(),
    readingTime: post.readingTime,
    tags: Array.isArray(post.tags) ? post.tags : [],
    coverImage: post.coverImage,
    videoDemo: post.videoDemo,
    liveDemo: post.liveDemo,
    body: Array.isArray(post.body) ? post.body : [],
    isFeatured: post.isFeatured,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    author: post.author,
    categories: post.categories,
    technologies: post.technologies,
  }
}

function sanitizeTutorial(
  tutorial: Partial<Tutorial> & Pick<Tutorial, "_id" | "title" | "slug">,
): Tutorial {
  return {
    _id: tutorial._id,
    title: tutorial.title,
    slug: tutorial.slug,
    description: tutorial.description || "No description available.",
    difficulty: tutorial.difficulty || "intermediate",
    totalDuration: tutorial.totalDuration,
    publishedAt: tutorial.publishedAt || new Date().toISOString(),
    tags: Array.isArray(tutorial.tags) ? tutorial.tags : [],
    isFeatured: tutorial.isFeatured,
    coverImage: tutorial.coverImage,
    videoDemo: tutorial.videoDemo,
    introduction: tutorial.introduction || [],
    steps: tutorial.steps || [],
    conclusion: tutorial.conclusion || [],
    prerequisites: tutorial.prerequisites || [],
    learningOutcomes: tutorial.learningOutcomes || [],
    author: tutorial.author,
    categories: tutorial.categories,
    technologies: tutorial.technologies,
  }
}

export async function getAllPosts(): Promise<{
  posts: BlogPost[]
  source: BlogSource
  configMissing?: boolean
}> {
  if (!client) {
    return { posts: mockPosts, source: "mock", configMissing: true }
  }

  try {
    const posts = await client.fetch<BlogPost[]>(postsQuery)
    if (!posts?.length) return { posts: mockPosts, source: "mock" }
    return { posts: posts.map(sanitizePost), source: "sanity" }
  } catch (err) {
    console.error("[Sanity] Failed to fetch posts:", err)
    return { posts: mockPosts, source: "mock" }
  }
}

export async function getPostBySlug(
  slug: string,
): Promise<{ post: BlogPost | null; source: BlogSource }> {
  if (!client) {
    const post = mockPosts.find((p) => p.slug === slug) ?? null
    return { post, source: "mock" }
  }

  try {
    const post = await client.fetch<BlogPost | null>(postBySlugQuery, { slug })
    if (!post) return { post: null, source: "sanity" }
    return { post: sanitizePost(post), source: "sanity" }
  } catch {
    const post = mockPosts.find((p) => p.slug === slug) ?? null
    return { post, source: "mock" }
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const { posts } = await getAllPosts()
  return posts.map((p) => p.slug)
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  if (!client) return []

  try {
    const posts = await client.fetch<BlogPost[]>(featuredPostsQuery)
    return posts.map(sanitizePost)
  } catch {
    return []
  }
}

export async function getAllTutorials(): Promise<{ tutorials: Tutorial[]; source: BlogSource }> {
  if (!client) return { tutorials: [], source: "mock" }

  try {
    const tutorials = await client.fetch<Tutorial[]>(tutorialsQuery)
    if (!tutorials?.length) return { tutorials: [], source: "mock" }
    return { tutorials: tutorials.map(sanitizeTutorial), source: "sanity" }
  } catch {
    return { tutorials: [], source: "mock" }
  }
}

export async function getTutorialBySlug(
  slug: string,
): Promise<{ tutorial: Tutorial | null; source: BlogSource }> {
  if (!client) return { tutorial: null, source: "mock" }

  try {
    const tutorial = await client.fetch<Tutorial | null>(tutorialBySlugQuery, { slug })
    if (!tutorial) return { tutorial: null, source: "sanity" }
    return { tutorial: sanitizeTutorial(tutorial), source: "sanity" }
  } catch {
    return { tutorial: null, source: "mock" }
  }
}

export async function getAllTutorialSlugs(): Promise<string[]> {
  const { tutorials } = await getAllTutorials()
  return tutorials.map((t) => t.slug)
}

export async function getFeaturedTutorials(): Promise<Tutorial[]> {
  if (!client) return []

  try {
    const tutorials = await client.fetch<Tutorial[]>(featuredTutorialsQuery)
    return tutorials.map(sanitizeTutorial)
  } catch {
    return []
  }
}

export function isSanityConfigured(): boolean {
  return hasSanityConfig
}
