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

export const privateLabelPageSchema = defineType({
  name: "privateLabelPage",
  title: "Private Label Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "intro", title: "Introduction" },
    { name: "benefits", title: "Benefits" },
    { name: "process", title: "Process" },
    { name: "cta", title: "Call to Action" },
  ],
  fields: [
    // Hero
    defineField({ ...loc("heroHeading", "Hero Heading"), group: "hero" }),
    defineField({ ...locText("heroSubheading", "Hero Subheading"), group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "Full-width image shown below the headline (e.g. branded bottles, packaging)",
    }),

    // Intro
    defineField({ ...loc("introHeading", "Introduction Heading"), group: "intro" }),
    defineField({
      name: "introImage1",
      title: "Intro Image 1",
      type: "image",
      group: "intro",
      options: { hotspot: true },
      description: "Left image in the two-photo grid below the intro text (e.g. custom label close-up)",
    }),
    defineField({
      name: "introImage2",
      title: "Intro Image 2",
      type: "image",
      group: "intro",
      options: { hotspot: true },
      description: "Right image in the two-photo grid below the intro text (e.g. production/bottling)",
    }),
    defineField({
      name: "introParagraphs",
      title: "Introduction Paragraphs",
      type: "array",
      group: "intro",
      of: [{
        type: "object",
        fields: [
          { name: "en", title: "English", type: "text", rows: 3 },
          { name: "lv", title: "Latvian", type: "text", rows: 3 },
        ],
        preview: { select: { title: "en" } },
      }],
    }),

    // Benefits
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      group: "benefits",
      of: [{
        type: "object",
        fields: [
          { name: "number", title: "Number (e.g. 01)", type: "string" },
          {
            name: "title", title: "Title", type: "object",
            fields: [
              { name: "en", title: "English", type: "string" },
              { name: "lv", title: "Latvian", type: "string" },
            ],
          },
          {
            name: "body", title: "Body", type: "object",
            fields: [
              { name: "en", title: "English", type: "text", rows: 2 },
              { name: "lv", title: "Latvian", type: "text", rows: 2 },
            ],
          },
        ],
        preview: { select: { title: "title.en" } },
      }],
    }),

    // Process
    defineField({ ...loc("processHeading", "Process Heading"), group: "process" }),
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      group: "process",
      of: [{
        type: "object",
        fields: [
          { name: "number", title: "Step Number (e.g. 01)", type: "string" },
          {
            name: "title", title: "Title", type: "object",
            fields: [
              { name: "en", title: "English", type: "string" },
              { name: "lv", title: "Latvian", type: "string" },
            ],
          },
          {
            name: "body", title: "Body", type: "object",
            fields: [
              { name: "en", title: "English", type: "text", rows: 2 },
              { name: "lv", title: "Latvian", type: "text", rows: 2 },
            ],
          },
        ],
        preview: { select: { title: "title.en" } },
      }],
    }),

    // CTA
    defineField({ ...loc("ctaHeading", "Call to Action Heading"), group: "cta" }),
    defineField({ ...locText("ctaBody", "Body Text"), group: "cta" }),
    defineField({ ...loc("ctaButtonText", "Button Text"), group: "cta" }),
    defineField({
      name: "ctaEmail",
      title: "Contact Email",
      type: "string",
      group: "cta",
    }),
  ],
  preview: {
    select: { heading: "heroHeading.en" },
    prepare: ({ heading }) => ({ title: heading || "Private Label Page" }),
  },
})
