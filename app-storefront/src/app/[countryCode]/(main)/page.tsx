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
        <h1
          className="type-xl text-center text-[#1d1d16]"
        >
          {lang === "lv" ? "Paši labākie cidoniju dzērieni" : "The best quince drinks"}
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
              {lang === "lv" ? "Vēlies pats savu sidru?" : "Want your own cider?"}
            </h2>
            <p className="type-lg text-white/60 mb-6">
              {lang === "lv"
                ? "Mēs nodrošinam ražošanu, tu izplatīšanu"
                : "We handle production, you handle distribution"}
            </p>
            <LocalizedClientLink href="/private-label" className="type-md text-white/70 hover:text-white transition-colors">
              {lang === "lv" ? "Uzzināt vairāk" : "Learn more"}
            </LocalizedClientLink>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <div className="grid grid-cols-1 md:grid-cols-[448fr_544fr] gap-32">
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="type-lg">
            {lang === "lv"
              ? "Ģimenes uzņēmums, kas ražo dzērienus no pašu saimniecībā audzētām cidonijām"
              : "A family business making drinks from home-grown quinces"}
          </h2>
          <p className="type-md text-ui-fg-subtle">
            {lang === "lv"
              ? "Mūsu sidrs ir unikāls Latvijas produkts – nekur citur pasaulē sidrs netiek gatavots no cidonijām. Mēs lepojamies ar to, ka mūsu sidrs ir skābi sauss, ar izteiktu raksturu un svaigumu – tas ir retums tirgū, kurā pārsvarā sastopami saldie sidri."
              : "Our cider is a unique Latvian product — nowhere else in the world is cider made from quinces. We're proud that our cider is sharply dry, with a distinctive character and freshness — a rarity in a market dominated by sweet ciders."}
          </p>
          <LocalizedClientLink href="/about" className="text-[#3067e1] font-medium">
            {lang === "lv" ? "Uzzināt vairāk par mums" : "Learn more about us"}
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
