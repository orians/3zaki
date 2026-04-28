import { Metadata } from "next"
import type { ReactNode } from "react"
import Image from "next/image"
import { getAboutPage } from "@lib/data/sanity"
import { getLocale } from "@lib/data/locale-actions"
import { urlFor } from "@lib/sanity/image"
import { Sprout, Citrus, FlaskConical, Timer, Wine } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us — 3 Zaķi",
  description:
    "A small family farm in Salaspils, Latvia, crafting artisan quince cider since 2012.",
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
  "01": <Sprout size={24} strokeWidth={2} />,
  "02": <Citrus size={24} strokeWidth={2} />,
  "03": <FlaskConical size={24} strokeWidth={2} />,
  "04": <Timer size={24} strokeWidth={2} />,
  "05": <Wine size={24} strokeWidth={2} />,
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
}

export default async function AboutPage() {
  const [data, currentLocale] = await Promise.all([
    getAboutPage(),
    getLocale(),
  ])

  const lang = currentLocale?.split("-")[0]?.toLowerCase() ?? "en"

  const headline1 = t(data?.heroHeadline?.line1, lang, "Three rabbits.")
  const headline2 = t(data?.heroHeadline?.line2, lang, "One orchard.")
  const headline3 = t(data?.heroHeadline?.line3, lang, "Pure quince.")

  const storyHeading = t(data?.storyHeading, lang, "Born from a single quince tree that refused to die")
  const storyParagraphs = data?.storyParagraphs?.length
    ? data.storyParagraphs.map((p) => t(p, lang))
    : [
        "In 2012, Jānis Jansons noticed that the ancient quince tree behind his family's farmhouse in Rūķi was producing more fruit than any single family could ever eat. Rather than let the harvest rot, he pressed the first batch — a rough, experimental cider that his neighbours said tasted like autumn itself.",
        "Word spread the way things do in small Latvian villages: quietly, then all at once. By the third harvest, the three goats that wandered the orchard had become an unofficial mascot. By the fifth, 3 Zaķi was a real cidery.",
        "We still press every batch by hand. We still use fruit from the same orchard. The goats, regrettably, have retired.",
      ]

  const processHeading = t(data?.processHeading, lang, "From tree to bottle")
  const processSteps = data?.processSteps?.length
    ? data.processSteps.map((s) => ({
        step: s.step,
        title: t(s.title, lang),
        body: t(s.body, lang),
      }))
    : [
        { step: "01", title: "Harvest", body: "Every quince is hand-picked in October, when the fruit has turned from green to gold and the orchard smells faintly of warm pears." },
        { step: "02", title: "Press", body: "We wash, sort, and press the same day. No skin contact beyond what happens naturally. The juice runs pale amber." },
        { step: "03", title: "Wild ferment", body: "The juice goes straight into neutral oak barrels with nothing added — no commercial yeast, no sulphites at this stage. Fermentation starts within days and runs for six to ten weeks." },
        { step: "04", title: "Rest", body: "Finished cider rests on fine lees until late spring. This is where the texture comes from: a gentle creaminess that smooths the quince's natural tartness." },
        { step: "05", title: "Bottle", body: "We bottle by hand in small runs, adding a minimal dose of sulphite for stability and a light carbonation. Every bottle is numbered." },
      ]

  const teamHeading = t(data?.teamHeading, lang, "The people behind the cider")
  const teamIntro = t(data?.teamIntro, lang, "Three generations of the Jansons family tend the orchard, press the fruit, and make every decision about what goes into each bottle.")
  const teamMembers = data?.teamMembers?.length
    ? data.teamMembers.map((m) => ({
        name: m.name,
        role: t(m.role, lang),
        bio: t(m.bio, lang),
      }))
    : [
        { name: "Jānis Jansons", role: "Founder & Head Cidermaker", bio: "Jānis spent twenty years as an agronomist before the quince tree changed his plans. He handles fermentation decisions and anything that requires patience." },
        { name: "Marta Jansone", role: "Orchard & Harvest", bio: "Marta manages the orchard through the year — pruning, soil, and the final call on harvest timing. She is the reason the fruit arrives at the press in good condition." },
        { name: "Toms Jansons", role: "Sales & Logistics", bio: "Jānis and Marta's son. He joined full-time in 2019 to handle export accounts and the relationships that get the cider from Rūķi to your table." },
      ]

  const valuesHeading = t(data?.valuesHeading, lang, "How we work")
  const values = data?.values?.length
    ? data.values.map((v) => ({
        number: v.number,
        image: v.image ?? null,
        title: t(v.title, lang),
        body: t(v.body, lang),
      }))
    : [
        { number: "01", image: null, title: "Single-orchard fruit", body: "Every bottle traces back to one piece of land. No blending from other farms, no shortcuts." },
        { number: "02", image: null, title: "Wild fermentation", body: "We rely on the native yeasts living on the fruit skin. Slower, less predictable, and worth every day of waiting." },
        { number: "03", image: null, title: "Small batches only", body: "We cap each release. When it's gone, it's gone. That's the point." },
      ]

  const contactHeading = t(data?.contactHeading, lang, "Come see the orchard")
  const address = t(data?.address, lang, "Rūķi, Salaspils Lauku teritorija\nLV-2118, Latvia")
  const email = data?.email ?? "jansons@3zaki.lv"
  const phone = data?.phone ?? "+371 29565123"

  return (
    <div className="w-full">

      {/* Hero */}
      <section className="bg-white border-b border-ui-border-base">
        <div className="content-container pt-16 pb-0">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-12">
            <h1 className="type-xl text-ui-fg-base">
              {headline1}<br />
              {headline2}<br />
              {headline3}
            </h1>
          </div>
          {data?.heroImage ? (
            <div className="relative w-full h-[360px] md:h-[580px] overflow-hidden">
              <Image
                src={urlFor(data.heroImage).width(1400).quality(80).auto("format").url()}
                alt="3 Zaķi orchard"
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-[360px] md:h-[580px] bg-[#d9cdb8] flex items-end p-6">
              <span className="type-md text-[#8a7a62]">Orchard photo</span>
            </div>
          )}
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-ui-border-base">
        <div className="content-container py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="type-lg text-ui-fg-base">{storyHeading}</h2>
            </div>
            <div className="flex flex-col gap-5">
              {storyParagraphs.map((p, i) => (
                <p key={i} className="type-lg text-ui-fg-subtle">{p}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="content-container pb-20 md:pb-28">
          <div className="grid grid-cols-2 gap-16 md:gap-24">
            {data?.storyImage1 ? (
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={urlFor(data.storyImage1).width(800).quality(80).auto("format").url()}
                  alt="Farmhouse"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square bg-[#e0d5c0] flex items-end p-5">
                <span className="type-md text-[#8a7a62]">Farmhouse photo</span>
              </div>
            )}
            {data?.storyImage2 ? (
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={urlFor(data.storyImage2).width(800).quality(80).auto("format").url()}
                  alt="Quince harvest"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square bg-[#c8bca4] flex items-end p-5">
                <span className="type-md text-[#8a7a62]">Quince harvest photo</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-ui-border-base">
        <div className="content-container py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-14">
            <h2 className="type-lg text-ui-fg-base">{processHeading}</h2>
          </div>
          <div className="flex flex-col divide-y divide-ui-border-base">
            {processSteps.map((s) => (
              <div key={s.step} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 py-8 items-start">
                <div className="flex items-start gap-6">
                  <div className="text-ui-fg-muted mt-0.5 flex-shrink-0">
                    {processIcons[s.step] ?? <span className="type-md">{s.step}</span>}
                  </div>
                  <h3 className="type-md-medium text-ui-fg-base">{s.title}</h3>
                </div>
                <p className="type-md text-ui-fg-subtle">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#f4f4f0] border-b border-ui-border-base">
        <div className="content-container py-20 md:py-28">
          <div className="mb-16 md:w-1/2">
            <h2 className="type-lg text-ui-fg-base mb-4">{teamHeading}</h2>
            <p className="type-lg text-ui-fg-subtle">{teamIntro}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col gap-2">
                {/* Avatar placeholder — replace with portrait photo */}
                <div className="w-20 h-20 bg-[#d9cdb8] flex items-center justify-center mb-4">
                  <span className="type-md-medium text-[#6b5d4a]">{getInitials(member.name)}</span>
                </div>
                <h3 className="type-md-medium text-ui-fg-base">{member.name}</h3>
                <p className="type-md text-ui-fg-muted">{member.role}</p>
                <p className="type-md text-ui-fg-subtle mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-ui-border-base">
        <div className="content-container py-20 md:py-28">
          <h2 className="type-lg text-ui-fg-base mb-14">{valuesHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {values.map((item) => (
              <div key={item.number} className="flex flex-col gap-5">
                {item.image ? (
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={urlFor(item.image).width(600).quality(80).auto("format").url()}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[4/3] bg-[#e0d5c0] flex items-end p-4">
                    <span className="type-md text-[#8a7a62]">{item.title} photo</span>
                  </div>
                )}
                <div>
                  <h3 className="type-md-medium text-ui-fg-base mb-3">{item.title}</h3>
                  <p className="type-md text-ui-fg-subtle">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section>
        <div className="content-container py-20 md:py-28">
          <h2 className="type-lg text-ui-fg-base mb-12">{contactHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col gap-6">
              <div>
                <p className="type-md text-ui-fg-muted mb-1">Address</p>
                <p className="type-md text-ui-fg-subtle whitespace-pre-line">{address}</p>
              </div>
              <div>
                <p className="type-md text-ui-fg-muted mb-1">Email</p>
                <a href={`mailto:${email}`} className="type-md text-ui-fg-subtle hover:text-ui-fg-base transition-colors">
                  {email}
                </a>
              </div>
              <div>
                <p className="type-md text-ui-fg-muted mb-1">Phone</p>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="type-md text-ui-fg-subtle hover:text-ui-fg-base transition-colors">
                  {phone}
                </a>
              </div>
            </div>
            <div className="flex">
              {/* Map placeholder */}
              <div className="w-full bg-[#e0d5c0] flex items-center justify-center min-h-[200px]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8a7a62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
