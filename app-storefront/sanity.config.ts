import { defineConfig } from "sanity"
import { schemaTypes } from "./src/lib/sanity/schemas"

export default defineConfig({
  projectId: "3ehwpcpg",
  dataset: "production",
  schema: {
    types: schemaTypes,
  },
})
