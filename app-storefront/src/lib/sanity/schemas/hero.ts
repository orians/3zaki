import { defineField, defineType } from "sanity"

const localized = (name: string, title: string, type: "string" | "text" = "string") =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "en", title: "English", type },
      { name: "lv", title: "Latvian", type },
    ],
  })

export const heroSchema = defineType({
  name: "hero",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "privateLabel", title: "Private Label CTA" },
    { name: "about", title: "About Teaser" },
  ],
  fields: [
    // Hero
    { ...localized("heroHeading", "Heading"), group: "hero" },

    // Private Label CTA
    { ...localized("privateLabelHeading", "Heading"), group: "privateLabel" },
    { ...localized("privateLabelDescription", "Description"), group: "privateLabel" },
    { ...localized("privateLabelCtaText", "CTA Link Text"), group: "privateLabel" },

    // About Teaser
    { ...localized("aboutHeading", "Heading"), group: "about" },
    { ...localized("aboutBody", "Body", "text"), group: "about" },
    { ...localized("aboutCtaText", "CTA Link Text"), group: "about" },
    defineField({
      name: "aboutImage",
      title: "Image",
      type: "image",
      group: "about",
      description: "Photo shown next to the about-us blurb.",
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
