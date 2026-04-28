import { defineField, defineType } from "sanity"

const localizedText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "en", title: "English", type: "string" },
      { name: "lv", title: "Latvian", type: "string" },
    ],
  })

const localizedTextArea = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "en", title: "English", type: "text", rows: 3 },
      { name: "lv", title: "Latvian", type: "text", rows: 3 },
    ],
  })

export const aboutPageSchema = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "story", title: "Our Story" },
    { name: "process", title: "The Process" },
    { name: "team", title: "The Team" },
    { name: "values", title: "How We Work" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    // Hero
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "object",
      group: "hero",
      description: "Each line of the hero headline",
      fields: [
        {
          name: "line1",
          title: "Line 1",
          type: "object",
          fields: [
            { name: "en", title: "English", type: "string" },
            { name: "lv", title: "Latvian", type: "string" },
          ],
        },
        {
          name: "line2",
          title: "Line 2",
          type: "object",
          fields: [
            { name: "en", title: "English", type: "string" },
            { name: "lv", title: "Latvian", type: "string" },
          ],
        },
        {
          name: "line3",
          title: "Line 3",
          type: "object",
          fields: [
            { name: "en", title: "English", type: "string" },
            { name: "lv", title: "Latvian", type: "string" },
          ],
        },
      ],
    }),

    // Hero image
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
    }),

    // Story
    defineField({
      ...localizedText("storyHeading", "Story Heading"),
      group: "story",
    }),
    defineField({
      name: "storyImage1",
      title: "Story Image — Left",
      type: "image",
      group: "story",
      options: { hotspot: true },
    }),
    defineField({
      name: "storyImage2",
      title: "Story Image — Right",
      type: "image",
      group: "story",
      options: { hotspot: true },
    }),
    defineField({
      name: "storyParagraphs",
      title: "Story Paragraphs",
      type: "array",
      group: "story",
      of: [
        {
          type: "object",
          fields: [
            { name: "en", title: "English", type: "text", rows: 3 },
            { name: "lv", title: "Latvian", type: "text", rows: 3 },
          ],
          preview: { select: { title: "en" } },
        },
      ],
    }),

    // Process
    defineField({
      ...localizedText("processHeading", "Process Heading"),
      group: "process",
    }),
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            { name: "step", title: "Step Number (e.g. 01)", type: "string" },
            {
              name: "title",
              title: "Title",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "lv", title: "Latvian", type: "string" },
              ],
            },
            {
              name: "body",
              title: "Body",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "text", rows: 2 },
                { name: "lv", title: "Latvian", type: "text", rows: 2 },
              ],
            },
          ],
        },
      ],
    }),

    // Team
    defineField({
      ...localizedText("teamHeading", "Team Heading"),
      group: "team",
    }),
    defineField({
      ...localizedTextArea("teamIntro", "Team Introduction"),
      group: "team",
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      group: "team",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "role",
              title: "Role",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "lv", title: "Latvian", type: "string" },
              ],
            },
            {
              name: "bio",
              title: "Bio",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "text", rows: 3 },
                { name: "lv", title: "Latvian", type: "text", rows: 3 },
              ],
            },
          ],
          preview: { select: { title: "name" } },
        },
      ],
    }),

    // Values
    defineField({
      ...localizedText("valuesHeading", "Values Heading"),
      group: "values",
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      group: "values",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Number (e.g. 01)", type: "string" },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "title",
              title: "Title",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "lv", title: "Latvian", type: "string" },
              ],
            },
            {
              name: "body",
              title: "Body",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "text", rows: 2 },
                { name: "lv", title: "Latvian", type: "text", rows: 2 },
              ],
            },
          ],
          preview: { select: { title: "title.en" } },
        },
      ],
    }),

    // Contact
    defineField({
      ...localizedText("contactHeading", "Contact Heading"),
      group: "contact",
    }),
    defineField({
      ...localizedTextArea("address", "Address"),
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
  ],
})
