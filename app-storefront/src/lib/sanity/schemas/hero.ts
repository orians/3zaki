import { defineField, defineType } from "sanity"

export const heroSchema = defineType({
  name: "hero",
  title: "Hero Banner",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "lv", title: "Latvian", type: "string" },
      ],
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "lv", title: "Latvian", type: "string" },
      ],
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "lv", title: "Latvian", type: "string" },
      ],
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button Link",
      type: "string",
      description: "e.g. /store or /collections/new-arrivals",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutImage",
      title: "About Teaser Image",
      type: "image",
      description: "Photo shown next to the about-us blurb on the home page.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          initialValue: "3 Zaķi quince orchard",
        }),
      ],
    }),
  ],
})
