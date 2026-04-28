import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { getProductPage } from "@lib/data/sanity"
import { getLocale } from "@lib/data/locale-actions"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

function pick(field: { en?: string; lv?: string } | null | undefined, lang: string, fallback = ""): string {
  if (!field) return fallback
  return field[lang as "en" | "lv"] ?? field.en ?? fallback
}

const ProductTemplate = async ({
  product,
  region,
  countryCode,
  images,
}: ProductTemplateProps) => {
  if (!product || !product.id) {
    return notFound()
  }

  const [productPage, currentLocale] = await Promise.all([
    getProductPage().catch(() => null),
    getLocale().catch(() => null),
  ])

  const lang = currentLocale?.split("-")[0]?.toLowerCase() ?? "en"

  const vatLabel = pick(productPage?.vatLabel, lang, "VAT included")

  const tabStrings = {
    productInfoTabLabel: pick(productPage?.productInfoTabLabel, lang, "Product Information"),
    shippingTabLabel: pick(productPage?.shippingTabLabel, lang, "Shipping & Returns"),
    volumeLabel: pick(productPage?.volumeLabel, lang, "Volume"),
    alcoholLabel: pick(productPage?.alcoholLabel, lang, "Alcohol content"),
    originLabel: pick(productPage?.originLabel, lang, "Country of origin"),
    shippingItems: (productPage?.shippingItems ?? []).map((item) => ({
      title: pick(item.title, lang),
      body: pick(item.body, lang),
    })),
  }

  return (
    <>
      <div
        className="content-container grid grid-cols-1 small:grid-cols-[3fr_2fr] gap-8 small:gap-24 py-8"
        data-testid="product-container"
      >
        {/* Left — image */}
        <div>
          <ImageGallery images={images} />
        </div>

        {/* Right — product details */}
        <div className="flex flex-col gap-y-6 small:sticky small:top-24 small:self-start">
          <ProductInfo product={product} />
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
                vatLabel={vatLabel}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} vatLabel={vatLabel} />
          </Suspense>
          <ProductTabs product={product} strings={tabStrings} />
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
