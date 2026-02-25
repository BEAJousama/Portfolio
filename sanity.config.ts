import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { codeInput } from "@sanity/code-input"
import { schemaTypes } from "./sanity/schemas"
import { ImportMarkdownAction } from "./sanity/actions/import-markdown"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: "obeaj-portfolio",
  title: "Obeaj Portfolio",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Portfolio Content")
          .items([
            S.documentTypeListItem("post").title("Blog Posts"),
            S.documentTypeListItem("tutorial").title("Tutorials"),
            S.divider(),
            S.documentTypeListItem("category").title("Categories"),
            S.documentTypeListItem("technology").title("Technologies"),
            S.divider(),
            S.documentTypeListItem("author").title("Authors"),
          ]),
    }),
    visionTool(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, ctx) =>
      ctx.schemaType === "post"
        ? [ImportMarkdownAction, ...prev]
        : prev,
  },
})
