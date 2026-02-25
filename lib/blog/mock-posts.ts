import type { BlogPost } from "@/lib/blog/types"

export const mockPosts: BlogPost[] = [
  {
    _id: "mock-1",
    title: "How I Build Fast Next.js Portfolio Experiences",
    slug: "fast-nextjs-portfolio-experiences",
    excerpt:
      "A practical breakdown of the architecture, performance habits, and UI patterns I use to keep portfolio sites both expressive and fast.",
    publishedAt: "2026-02-10T10:00:00.000Z",
    tags: ["nextjs", "performance", "frontend"],
    coverImage: undefined,
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "A portfolio is a product, not just a static page. I treat it with the same constraints as production software: reliability, speed, and clear UX.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "My baseline stack is Next.js with route-level optimization, lightweight UI state, and careful animation budgets. Every visual effect has to justify its cost.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "I also keep content modular so sections can evolve independently as my projects and experience grow.",
          },
        ],
      },
    ],
  },
  {
    _id: "mock-2",
    title: "Designing Developer Portfolios With Strong Storytelling",
    slug: "developer-portfolio-storytelling",
    excerpt:
      "From hero copy to project cards, this is my process for turning technical work into a clear narrative that recruiters and founders can scan quickly.",
    publishedAt: "2026-01-28T10:00:00.000Z",
    tags: ["design", "career", "portfolio"],
    coverImage: undefined,
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Great portfolios balance personality with proof. I focus on impact statements, project outcomes, and concise technical context instead of long descriptions.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Visual hierarchy matters: if a reader can understand your strengths in 15 seconds, you are already ahead.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "The final layer is consistency. Colors, typography, motion, and language should feel intentional across the full experience.",
          },
        ],
      },
    ],
  },
]
