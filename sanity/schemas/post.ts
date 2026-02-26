import { defineField, defineType } from "sanity"
import BlockquoteStyle from "@/sanity/components/blockquote-style"

export const postSchema = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on the blog listing page.",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "technology" }] }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      validation: (Rule) => Rule.integer().min(1).max(120),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "liveDemo",
      title: "Live Demo",
      type: "object",
      description: "Optional link to a live demo or deployed app for this post.",
      fields: [
        defineField({
          name: "url",
          title: "Demo URL",
          type: "url",
          validation: (Rule) =>
            Rule.uri({ scheme: ["http", "https"] }),
        }),
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          description: "Optional button text. Defaults to “View live demo”.",
        }),
        defineField({
          name: "codeUrl",
          title: "Code Repository URL",
          type: "url",
          description: "Optional link to the GitHub (or other) repo for this demo.",
          validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
        }),
        defineField({
          name: "codeLabel",
          title: "Code Button Label",
          type: "string",
          description: "Optional button text for the code link. Defaults to “View source code”.",
        }),
      ],
    }),
    defineField({
      name: "videoDemo",
      title: "Video Demo",
      type: "object",
      description: "Optional demo video: upload a file (recommended) or paste a YouTube/Vimeo/direct link.",
      fields: [
        defineField({
          name: "file",
          title: "Upload video",
          type: "file",
          options: {
            accept: "video/*",
            storeOriginalFilename: true,
          },
          description: "Upload an .mp4 or .webm file. Ignored if you set a URL below.",
        }),
        defineField({
          name: "url",
          title: "Or video URL",
          type: "url",
          description: "YouTube, Vimeo, or direct .mp4/.webm link. Leave empty if you uploaded a file.",
          validation: (Rule) =>
            Rule.uri({ scheme: ["http", "https"] }).custom((url, ctx) => {
              const file = (ctx.parent as { file?: { asset?: unknown } })?.file
              if (url && file?.asset) return "Remove the uploaded file or clear the URL — use one or the other."
              return true
            }),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional label shown below the video.",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote", component: BlockquoteStyle },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
        {
          type: "object",
          name: "codeBlock",
          title: "Code Block",
          fields: [
            {
              name: "language",
              type: "string",
              title: "Language",
              options: {
                list: [
                  { title: "TypeScript", value: "typescript" },
                  { title: "JavaScript", value: "javascript" },
                  { title: "JSX / TSX", value: "tsx" },
                  { title: "Bash / Shell", value: "bash" },
                  { title: "CSS", value: "css" },
                  { title: "HTML", value: "html" },
                  { title: "JSON", value: "json" },
                  { title: "Python", value: "python" },
                  { title: "SQL", value: "sql" },
                  { title: "Plain Text", value: "text" },
                ],
              },
              initialValue: "typescript",
            },
            {
              name: "filename",
              type: "string",
              title: "Filename (optional)",
            },
            {
              name: "code",
              type: "text",
              title: "Code",
              rows: 10,
            },
          ],
          preview: {
            select: { language: "language", filename: "filename", code: "code" },
            prepare({ language, filename, code }) {
              return {
                title: filename || language || "Code Block",
                subtitle: code?.slice(0, 60),
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      description: "Show this post in the featured section",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Overrides the main title for search engines (optional).",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Overrides the excerpt for search engines (optional).",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "coverImage",
      author: "author.name",
    },
    prepare({ title, subtitle, media, author }) {
      return {
        title,
        subtitle: author ? `by ${author} • ${subtitle}` : subtitle,
        media,
      }
    },
  },
})
