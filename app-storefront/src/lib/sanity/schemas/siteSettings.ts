import { defineField, defineType } from "sanity"

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "storeName",
      title: "Store Name",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "lv", title: "Latvian", type: "string" },
      ],
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "lv", title: "Latvian", type: "string" },
      ],
    }),
    defineField({
      name: "footerAddress",
      title: "Footer Address",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 2 },
        { name: "lv", title: "Latvian", type: "text", rows: 2 },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform (e.g. Instagram)", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Store logo (SVG recommended). Shown in nav and footer.",
      options: { hotspot: false },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Accessibility description of the logo (e.g. '3 Zaķi logo')",
        }),
      ],
    }),
    defineField({
      name: "copyrightName",
      title: "Copyright Name",
      type: "string",
      description: "Appears in '© 2025 [name]. All rights reserved.'",
    }),
    defineField({
      name: "heroDecoration",
      title: "Hero Decoration",
      type: "image",
      description: "Decorative image shown between the nav and the main heading on the home page (SVG or PNG). Leave empty to use the default rabbit mark.",
      options: { hotspot: false },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          initialValue: "3 Zaķi",
        }),
      ],
    }),
  ],
})
