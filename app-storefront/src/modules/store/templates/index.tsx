import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { getLocale } from "@lib/data/locale-actions"
import { getStorePage } from "@lib/data/sanity"
import PaginatedProducts from "./paginated-products"

const HEADING: Record<string, string> = { en: "Drinks", lv: "Dzērieni" }

const INTRO_FALLBACK: Record<string, string> = {
  en: "Our quince drinks are a unique Latvian product — as far as we know, nowhere else in the world are drinks made from quince created in this way and in such a wide range. We are proud of their expressive character, freshness, and natural flavour intensity — qualities that set them apart among traditional fruit drinks.",
  lv: "Mūsu cidoniju dzērieni ir unikāls Latvijas produkts — cik mums zināms, nekur citur pasaulē dzērieni no cidonijām netiek radīti šādā veidā un tik plašā klāstā. Mēs lepojamies ar to izteiksmīgo raksturu, svaigumu un dabisko garšas intensitāti — īpašībām, kas tos izceļ tradicionālo augļu dzērienu vidū.",
}

const StoreTemplate = async ({
  page,
  countryCode,
}: {
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const [locale, storePageData] = await Promise.all([getLocale(), getStorePage()])
  const lang = locale?.split("-")[0]?.toLowerCase() ?? "en"
  const heading = HEADING[lang] ?? HEADING.en
  const intro =
    storePageData?.intro?.[lang as "en" | "lv"] ??
    storePageData?.intro?.en ??
    INTRO_FALLBACK[lang] ??
    INTRO_FALLBACK.en

  return (
    <div
      className="flex flex-col pt-16 pb-12 content-container"
      data-testid="category-container"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-16 pb-16 border-b border-ui-border-base">
        <h1 className="type-xl text-ui-fg-base" data-testid="store-page-title">{heading}</h1>
        <p className="type-lg text-ui-fg-subtle self-end">{intro}</p>
      </div>
      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts
          sortBy="created_at"
          page={pageNumber}
          countryCode={countryCode}
        />
      </Suspense>
    </div>
  )
}

export default StoreTemplate
