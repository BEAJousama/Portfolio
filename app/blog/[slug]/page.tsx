import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import BlogShell from "@/components/blog/blog-shell"
import PortableTextRenderer from "@/components/blog/portable-text-renderer"
import VideoDemo from "@/components/blog/video-demo"
import AuthorCard from "@/components/blog/author-card"
import TableOfContents from "@/components/blog/table-of-contents"
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog/api"
import { estimateReadingTimeMinutes, formatPostDate } from "@/lib/blog/format"
import { extractHeadings } from "@/lib/blog/toc"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const { post } = await getPostBySlug(slug)

  if (!post) return { title: "Post Not Found | OB.log" }

  return {
    title: `${post.title} | OB.log`,
    description: post.seoDescription ?? post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const { post, source } = await getPostBySlug(slug)

  if (!post) notFound()

  const readingTime = estimateReadingTimeMinutes(post.excerpt, post.body)
  const hasCategories = (post.categories?.length ?? 0) > 0
  const hasTechnologies = (post.technologies?.length ?? 0) > 0
  const headings = extractHeadings(post.body)

  return (
    <BlogShell>
      {/* ToC: fixed left sidebar on wide screens, sticky strip+dropdown on mobile */}
      {headings.length > 0 && <TableOfContents headings={headings} />}

      <article className="pixel-border bg-card p-6 md:p-10">

        {/* ── Meta row ── */}
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground md:text-sm">
          <span>{formatPostDate(post.publishedAt)}</span>
          <span>•</span>
          <span>{readingTime} min read</span>
          {source === "mock" && (
            <>
              <span>•</span>
              <span>Starter content</span>
            </>
          )}
          {hasCategories && (
            <>
              <span>•</span>
              <span className="flex flex-wrap gap-2">
                {post.categories!.map((cat) => (
                  <span
                    key={cat._id}
                    className="pixel-text uppercase tracking-widest"
                    style={{ color: cat.color ?? "var(--accent)" }}
                  >
                    {cat.title}
                  </span>
                ))}
              </span>
            </>
          )}
        </div>

        {/* ── Title ── */}
        <h1 className="game-title mb-5 text-xl leading-snug md:text-3xl">{post.title}</h1>

        {/* ── Excerpt ── */}
        <p className="pixel-text mb-6 border-l-4 border-accent pl-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          {post.excerpt}
        </p>

        {/* ── Tags ── */}
        {post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-2 border-border text-[0.65rem] uppercase tracking-wide"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* ── Video Demo ── */}
        {post.videoDemo?.url && <VideoDemo video={post.videoDemo} />}

        {/* ── Body ── */}
        <PortableTextRenderer body={post.body} />

        {/* ── Author ── */}
        {post.author && <AuthorCard author={post.author} />}

        {/* ── Technologies covered ── */}
        {hasTechnologies && (
          <div className="mt-10 border-t-2 border-border pt-6">
            <p className="pixel-text mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              Technologies covered
            </p>
            <div className="flex flex-wrap gap-2">
              {post.technologies!.map((tech) => (
                tech.website ? (
                  <a
                    key={tech._id}
                    href={tech.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-text inline-block border-2 border-border px-3 py-1 text-[0.65rem] uppercase tracking-wide transition-colors hover:border-accent hover:text-accent"
                  >
                    {tech.name}
                  </a>
                ) : (
                  <span
                    key={tech._id}
                    className="pixel-text inline-block border-2 border-border px-3 py-1 text-[0.65rem] uppercase tracking-wide"
                  >
                    {tech.name}
                  </span>
                )
              ))}
            </div>
          </div>
        )}
      </article>

      <div className="mt-6">
        <Link href="/blog" className="retro-button inline-flex items-center text-xs font-semibold md:text-sm">
          [ Back to Blog ]
        </Link>
      </div>
    </BlogShell>
  )
}
