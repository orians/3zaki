import { defineField, defineType } from "sanity"

const loc = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "en", title: "English", type: "string" },
      { name: "lv", title: "Latvian", type: "string" },
    ],
  })

const locText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "en", title: "English", type: "text", rows: 3 },
      { name: "lv", title: "Latvian", type: "text", rows: 3 },
    ],
  })

export const productPageSchema = defineType({
  name: "productPage",
  title: "Product Page",
  type: "document",
  groups: [
    { name: "tabs", title: "Product Tabs" },
    { name: "related", title: "Related Products" },
  ],
  fields: [
    // Tab labels
    defineField({ ...loc("productInfoTabLabel", "Product Info Tab Label"), group: "tabs" }),
    defineField({ ...loc("shippingTabLabel", "Shipping & Returns Tab Label"), group: "tabs" }),

    // Product Info tab — field labels
    defineField({ ...loc("volumeLabel", "Volume Label"), group: "tabs" }),
    defineField({ ...loc("alcoholLabel", "Alcohol Content Label"), group: "tabs" }),
    defineField({ ...loc("originLabel", "Country of Origin Label"), group: "tabs" }),

    // Shipping & Returns tab items
    defineField({
      name: "shippingItems",
      title: "Shipping & Returns Items",
      type: "array",
      group: "tabs",
      of: [
        {
          type: "object",
          fields: [
            loc("title", "Title"),
            locText("body", "Body"),
          ],
          preview: {
            select: { title: "title.en" },
          },
        },
      ],
    }),

    // Price label
    defineField({ ...loc("vatLabel", "VAT Label (below price)"), group: "tabs" }),

    // Related products section
    defineField({ ...loc("relatedHeading", "Related Products Heading"), group: "related" }),
    defineField({ ...locText("relatedSubheading", "Related Products Subheading"), group: "related" }),
  ],
})
