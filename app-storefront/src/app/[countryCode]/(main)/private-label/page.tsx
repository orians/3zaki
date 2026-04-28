import { Metadata } from "next"
import type { ReactNode } from "react"
import Image from "next/image"
import { getPrivateLabelPage } from "@lib/data/sanity"
import { getLocale } from "@lib/data/locale-actions"
import { urlFor } from "@lib/sanity/image"
import { Mail, FlaskConical, Palette, Truck } from "lucide-react"

export const metadata: Metadata = {
  title: "Private Label — 3 Zaķi",
  description: "Create your own branded quince cider with 3 Zaķi.",
}

function t(
  field: { en?: string; lv?: string } | null | undefined,
  lang: string,
  fallback = ""
): string {
  if (!field) return fallback
  return field[lang as "en" | "lv"] ?? field.en ?? fallback
}

const processIcons: Record<string, ReactNode> = {
  "01": <Mail size={24} strokeWidth={2} />,
  "02": <FlaskConical size={24} strokeWidth={2} />,
  "03": <Palette size={24} strokeWidth={2} />,
  "04": <Truck size={24} strokeWidth={2} />,
}

export default async function PrivateLabelPage() {
  const [data, currentLocale] = await Promise.all([
    getPrivateLabelPage(),
    getLocale(),
  ])

  const lang = currentLocale?.split("-")[0]?.toLowerCase() ?? "en"

  const heroHeading = t(data?.heroHeading, lang, "Your brand.\nOur cider.")
  const heroSubheading = t(data?.heroSubheading, lang, "We produce artisan quince cider under your label — minimum order quantities, custom packaging, and the same quality we put in every 3 Zaķi bottle.")
  const heroImage = data?.heroImage ?? null

  const introHeading = t(data?.introHeading, lang, "A complete private label service from orchard to shelf")
  const introParagraphs = data?.introParagraphs?.length
    ? data.introParagraphs.map((p) => t(p, lang))
    : [
        "Whether you run a restaurant, a hotel, a wine shop, or a corporate gift service — we can produce quince cider under your name. You bring the brand, we bring everything else.",
        "Each batch is made from the same single-orchard fruit we use for 3 Zaķi. The difference is the label on the bottle.",
        "We handle the full process end to end: fruit selection, fermentation, packaging coordination, and delivery. Your only job is to approve the label and place the order.",
      ]
  const introImage1 = data?.introImage1 ?? null
  const introImage2 = data?.introImage2 ?? null

  const benefits = data?.benefits?.length
    ? data.benefits.map((b) => ({ number: b.number, title: t(b.title, lang), body: t(b.body, lang) }))
    : [
        { number: "01", title: "Small minimums", body: "We work with orders from 50 cases. You don't need to commit to a container load to get started." },
        { number: "02", title: "Custom packaging", body: "Label design, bottle format, capsule colour — we coordinate the full packaging process with our suppliers." },
        { number: "03", title: "Consistent quality", body: "Every private label batch goes through the same tasting and quality checks as our own product." },
        { number: "04", title: "Fast turnaround", body: "From approved artwork to delivery, most orders are fulfilled within 6 weeks." },
      ]

  const processHeading = t(data?.processHeading, lang, "Four steps from enquiry to delivery")
  const processSteps = data?.processSteps?.length
    ? data.processSteps.map((s) => ({ number: s.number, title: t(s.title, lang), body: t(s.body, lang) }))
    : [
        { number: "01", title: "Get in touch", body: "Send us an email with your requirements — volume, timeline, and any packaging ideas you have." },
        { number: "02", title: "Sample approval", body: "We send samples for tasting. Once approved, we agree on the final spec." },
        { number: "03", title: "Artwork & production", body: "Your designer or ours creates the label artwork. Once approved, we begin production." },
        { number: "04", title: "Delivery", body: "Your finished product is delivered to your door or collected from the farm." },
      ]

  const ctaHeading = t(data?.ctaHeading, lang, "Ready to talk?")
  const ctaBody = t(data?.ctaBody, lang, "Send us an email with your requirements and we'll get back to you within two business days.")
  const ctaEmail = data?.ctaEmail ?? "jansons@3zaki.lv"

  return (
    <div className="w-full">

      {/* Hero */}
      <section className="bg-white border-b border-ui-border-base">
        <div className="content-container pt-16 pb-0">
          <div className="pb-12">
            <h1 className="type-xl text-ui-fg-base whitespace-pre-line">
              {heroHeading}
            </h1>
          </div>
          {heroImage ? (
            <div className="relative w-full h-[360px] md:h-[580px] overflow-hidden">
              <Image
                src={urlFor(heroImage).width(1400).quality(80).auto("format").url()}
                alt="Private label cider"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-[360px] md:h-[580px] bg-[#d9cdb8] flex items-end p-6">
              <span className="type-md text-[#8a7a62]">Branded bottles photo</span>
            </div>
          )}
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-ui-border-base">
        <div className="content-container py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="type-lg text-ui-fg-base">{introHeading}</h2>
            </div>
            <div className="flex flex-col gap-5">
              {introParagraphs.map((p, i) => (
                <p key={i} className="type-lg text-ui-fg-subtle">{p}</p>
              ))}
            </div>
          </div>
        </div>
        {/* Intro images — replace with custom label / production photos */}
        <div className="content-container pb-20 md:pb-28">
          <div className="grid grid-cols-2 gap-16 md:gap-24">
            {introImage1 ? (
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={urlFor(introImage1).width(800).quality(80).auto("format").url()}
                  alt="Custom label"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square bg-[#e0d5c0] flex items-end p-5">
                <span className="type-md text-[#8a7a62]">Custom label photo</span>
              </div>
            )}
            {introImage2 ? (
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={urlFor(introImage2).width(800).quality(80).auto("format").url()}
                  alt="Packaging detail"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square bg-[#c8bca4] flex items-end p-5">
                <span className="type-md text-[#8a7a62]">Packaging detail photo</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-black border-b border-white/10">
        <div className="content-container py-20 md:py-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            {benefits.map((item) => (
              <div key={item.number} className="flex flex-col gap-5">
                <span className="type-lg font-heading text-white/40">{item.number}</span>
                <div>
                  <h3 className="type-md-medium text-white mb-3">{item.title}</h3>
                  <p className="type-md text-white/60">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section>
        <div className="content-container py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-14">
            <h2 className="type-lg text-ui-fg-base">{processHeading}</h2>
          </div>
          <div className="flex flex-col divide-y divide-ui-border-base">
            {processSteps.map((step) => (
              <div key={step.number} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 py-8 items-start">
                <div className="flex items-start gap-6">
                  <div className="text-ui-fg-muted mt-0.5 flex-shrink-0">
                    {processIcons[step.number] ?? <span className="type-md">{step.number}</span>}
                  </div>
                  <h3 className="type-md-medium text-ui-fg-base">{step.title}</h3>
                </div>
                <p className="type-md text-ui-fg-subtle">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="content-container mb-24">
        <section className="-mx-6 bg-black border-b border-white/10">
          <div className="px-6 md:px-12 py-20 md:py-28">
            <div className="max-w-2xl">
              <h2 className="type-xl text-white mb-8">
                {ctaHeading}
              </h2>
              <p className="type-lg text-white/60 mb-6">{ctaBody}</p>
              <a
                href={`mailto:${ctaEmail}`}
                className="type-md text-white/70 hover:text-white transition-colors"
              >
                {ctaEmail}
              </a>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}
