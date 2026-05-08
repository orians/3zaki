import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "./schemas"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Hero Banner")
              .id("hero")
              .child(
                S.document()
                  .schemaType("hero")
                  .documentId("singleton-hero")
              ),
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("singleton-siteSettings")
              ),
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(
                S.document()
                  .schemaType("aboutPage")
                  .documentId("singleton-aboutPage")
              ),
            S.listItem()
              .title("Private Label Page")
              .id("privateLabelPage")
              .child(
                S.document()
                  .schemaType("privateLabelPage")
                  .documentId("singleton-privateLabelPage")
              ),
            S.listItem()
              .title("Drinks Page")
              .id("storePage")
              .child(
                S.document()
                  .schemaType("storePage")
                  .documentId("9bb46ecc-a74e-420d-9b93-0300a8dd4763")
              ),
            S.listItem()
              .title("Product Page")
              .id("productPage")
              .child(
                S.document()
                  .schemaType("productPage")
                  .documentId("6e7f42a5-5ce3-4ed3-b759-63c585daa4f4")
              ),
          ]),
    }),
    visionTool(),
  ],
})
