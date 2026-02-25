import { defineField, defineType } from "sanity"

export const tutorialStepType = defineType({
  name: "tutorialStep",
  title: "Tutorial Step",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Step Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Overview of what this step covers",
    }),
    defineField({
      name: "content",
      title: "Step Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
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
                  { name: "href", type: "url", title: "URL" },
                  { name: "blank", type: "boolean", title: "Open in new tab", initialValue: true },
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
          type: "code",
          options: {
            withFilename: true,
            languageAlternatives: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "Python", value: "python" },
              { title: "Go", value: "go" },
              { title: "Rust", value: "rust" },
              { title: "Java", value: "java" },
              { title: "C#", value: "csharp" },
              { title: "SQL", value: "sql" },
              { title: "Bash", value: "bash" },
              { title: "JSON", value: "json" },
              { title: "YAML", value: "yaml" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "Dockerfile", value: "dockerfile" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "duration",
      title: "Duration (minutes)",
      type: "number",
      description: "Estimated time to complete this step",
      validation: (Rule) => Rule.integer().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      duration: "duration",
    },
  },
})

export const tutorialSchema = defineType({
  name: "tutorial",
  title: "Tutorial",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "metadata",
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "metadata",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "metadata",
      description: "Short summary of what the user will learn",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "metadata",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "metadata",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      group: "metadata",
      of: [{ type: "reference", to: [{ type: "technology" }] }],
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty Level",
      type: "string",
      group: "metadata",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "intermediate",
    }),
    defineField({
      name: "totalDuration",
      title: "Total Duration (minutes)",
      type: "number",
      group: "metadata",
      description: "Estimated total time to complete the tutorial",
      validation: (Rule) => Rule.integer().min(1),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "metadata",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "metadata",
      options: { hotspot: true },
    }),
    defineField({
      name: "videoDemo",
      title: "Video Demo",
      type: "object",
      group: "metadata",
      description: "Optional demo video shown at the top of the tutorial (YouTube, Vimeo, or direct .mp4/.webm link).",
      fields: [
        defineField({
          name: "url",
          title: "Video URL",
          type: "url",
          validation: (Rule) =>
            Rule.uri({ scheme: ["http", "https"] }),
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
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      group: "metadata",
      description: "Show this tutorial in the featured section",
      initialValue: false,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "metadata",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "prerequisites",
      title: "Prerequisites",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Prerequisite Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "url",
              description: "Link to prerequisite tutorial or resource",
            }),
          ],
        },
      ],
      description: "What users should know before starting this tutorial",
    }),
    defineField({
      name: "learningOutcomes",
      title: "Learning Outcomes",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "What users will be able to do after completing",
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
        },
        { type: "image", options: { hotspot: true } },
        { type: "code" },
      ],
      description: "Introduction/setup content before the first step",
    }),
    defineField({
      name: "steps",
      title: "Tutorial Steps",
      type: "array",
      group: "content",
      of: [{ type: "tutorialStep" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "conclusion",
      title: "Conclusion",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
          ],
        },
        { type: "image", options: { hotspot: true } },
        { type: "code" },
      ],
      description: "Summary and next steps after completing the tutorial",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
  ],
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "metadata", title: "Metadata" },
    { name: "seo", title: "SEO" },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "coverImage",
      author: "author.name",
      difficulty: "difficulty",
    },
  },
})
