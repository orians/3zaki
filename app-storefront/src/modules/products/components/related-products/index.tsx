import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { getProductPage } from "@lib/data/sanity"
import { getLocale } from "@lib/data/locale-actions"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

function pick(field: { en?: string; lv?: string } | null | undefined, lang: string, fallback = ""): string {
  if (!field) return fallback
  return field[lang as "en" | "lv"] ?? field.en ?? fallback
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const [region, productPage, currentLocale] = await Promise.all([
    getRegion(countryCode),
    getProductPage(),
    getLocale(),
  ])

  if (!region) {
    return null
  }

  const lang = currentLocale?.split("-")[0]?.toLowerCase() ?? "en"
  const heading = pick(productPage?.relatedHeading, lang, "Related products")
  const subheading = pick(productPage?.relatedSubheading, lang, "You might also want to check out these products.")

  const queryParams: HttpTypes.StoreProductListParams = {}
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }
  queryParams.is_giftcard = false

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <div className="content-container pb-16">
      <div className="flex flex-col items-center text-center mb-12">
        <p className="text-sm text-ui-fg-subtle mb-2">{heading}</p>
        <h2
          className="text-[28px] leading-[36px] font-normal text-center text-[#1d1d16] max-w-lg"
          style={{ letterSpacing: "-0.04em" }}
        >
          {subheading}
        </h2>
      </div>

      <ul className="grid grid-cols-1 small:grid-cols-3 gap-x-6 gap-y-12">
        {products.map((product) => (
          <li key={product.id}>
            <Product region={region} product={product} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
