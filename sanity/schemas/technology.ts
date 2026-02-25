import { defineField, defineType } from "sanity"

export const technologySchema = defineType({
  name: "technology",
  title: "Technology",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 50 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Language", value: "language" },
          { title: "Framework", value: "framework" },
          { title: "Library", value: "library" },
          { title: "Database", value: "database" },
          { title: "DevOps", value: "devops" },
          { title: "Tool", value: "tool" },
          { title: "Cloud", value: "cloud" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: { hotspot: true },
      description: "Technology icon/logo (recommended: 64x64 or larger, transparent background)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "icon",
    },
  },
})
