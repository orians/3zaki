import { defineField, defineType } from "sanity"

export const storePageSchema = defineType({
  name: "storePage",
  title: "Drinks Page",
  type: "document",
  fields: [
    defineField({
      name: "intro",
      title: "Intro Text",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 4 },
        { name: "lv", title: "Latvian", type: "text", rows: 4 },
      ],
    }),
  ],
})
