import { type SchemaTypeDefinition } from "sanity"

import { postSchema } from "./post"
import { tutorialSchema, tutorialStepType } from "./tutorial"
import { categorySchema } from "./category"
import { technologySchema } from "./technology"
import { authorSchema } from "./author"

export const schemaTypes: SchemaTypeDefinition[] = [
  postSchema,
  tutorialSchema,
  categorySchema,
  technologySchema,
  authorSchema,
  tutorialStepType as SchemaTypeDefinition,
]
