import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { getLocale } from "@lib/data/locale-actions"
import PaginatedProducts from "./paginated-products"

const HEADING: Record<string, string> = { en: "Drinks", lv: "Dzērieni" }

const StoreTemplate = async ({
  page,
  countryCode,
}: {
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const locale = await getLocale()
  const lang = locale?.split("-")[0]?.toLowerCase() ?? "en"
  const heading = HEADING[lang] ?? HEADING.en

  return (
    <div
      className="flex flex-col pt-16 pb-12 content-container"
      data-testid="category-container"
    >
      <h1 className="type-xl mb-12" data-testid="store-page-title">{heading}</h1>
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
