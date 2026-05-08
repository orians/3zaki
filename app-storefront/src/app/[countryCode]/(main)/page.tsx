import { Metadata } from "next"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import HeroDecoration from "@modules/home/components/hero-decoration"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { getLocale } from "@lib/data/locale-actions"
import { getSiteSettings, getHero } from "@lib/data/sanity"
import { urlFor } from "@lib/sanity/image"

export const metadata: Metadata = {
  title: "3 Zaķi",
  description: "Latvian quince cider — shop online.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const [region, currentLocale, siteSettings, hero] = await Promise.all([
    getRegion(countryCode),
    getLocale(),
    getSiteSettings(),
    getHero(),
  ])

  if (!region) return null

  const lang = currentLocale?.split("-")[0]?.toLowerCase() ?? "en"
  const t = (field: { en: string; lv: string } | undefined, fallbackEn: string, fallbackLv: string) =>
    lang === "lv" ? (field?.lv || fallbackLv) : (field?.en || fallbackEn)

  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: { fields: "*variants.calculated_price,+subtitle,+description,+images,+thumbnail,+metadata", limit: 12 },
  })

  return (
    <div className="content-container pt-16 pb-16 flex flex-col gap-24">

      {/* Hero: decoration + heading */}
      <div className="flex flex-col items-center gap-16">
        <HeroDecoration heroDecoration={siteSettings?.heroDecoration} />
        <h1 className="type-xl text-center text-[#1d1d16]">
          {t(hero?.heroHeading, "The best quince drinks", "Paši labākie cidoniju dzērieni")}
        </h1>
      </div>

      {/* Product grid */}
      <ul className="grid grid-cols-1 small:grid-cols-3 gap-x-6 gap-y-12">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>

      {/* Private Label CTA */}
      <section className="-mx-6 bg-black border-b border-white/10">
        <div className="px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-2xl">
            <h2 className="type-xl text-white mb-8">
              {t(hero?.privateLabelHeading, "Want your own cider?", "Vēlies pats savu sidru?")}
            </h2>
            <p className="type-lg text-white/60 mb-6">
              {t(hero?.privateLabelDescription, "We handle production, you handle distribution", "Mēs nodrošinam ražošanu, tu izplatīšanu")}
            </p>
            <LocalizedClientLink href="/private-label" className="type-md text-white/70 hover:text-white transition-colors">
              {t(hero?.privateLabelCtaText, "Learn more", "Uzzināt vairāk")}
            </LocalizedClientLink>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <div className="grid grid-cols-1 md:grid-cols-[448fr_544fr] gap-32">
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="type-lg">
            {t(hero?.aboutHeading, "A family business making drinks from home-grown quinces", "Ģimenes uzņēmums, kas ražo dzērienus no pašu saimniecībā audzētām cidonijām")}
          </h2>
          <p className="type-md text-ui-fg-subtle">
            {t(hero?.aboutBody, "Our cider is a unique Latvian product — nowhere else in the world is cider made from quinces. We're proud that our cider is sharply dry, with a distinctive character and freshness — a rarity in a market dominated by sweet ciders.", "Mūsu sidrs ir unikāls Latvijas produkts – nekur citur pasaulē sidrs netiek gatavots no cidonijām. Mēs lepojamies ar to, ka mūsu sidrs ir skābi sauss, ar izteiktu raksturu un svaigumu – tas ir retums tirgū, kurā pārsvarā sastopami saldie sidri.")}
          </p>
          <LocalizedClientLink href="/about" className="text-[#3067e1] font-medium">
            {t(hero?.aboutCtaText, "Learn more about us", "Uzzināt vairāk par mums")}
          </LocalizedClientLink>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#d4cfc4]">
          {hero?.aboutImage?.asset && (
            <Image
              src={urlFor(hero.aboutImage).width(800).url()}
              alt={hero.aboutImage.alt ?? "3 Zaķi"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      </div>

    </div>
  )
}
