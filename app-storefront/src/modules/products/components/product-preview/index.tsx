import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({ product })
  const metadata = product.metadata as Record<string, string> | null

  const metaLine = [
    metadata?.alcohol_content ? `Alk. ${metadata.alcohol_content}%` : null,
    metadata?.volume_ml ? `${metadata.volume_ml} ml` : null,
  ]
    .filter(Boolean)
    .join(". ")

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex flex-col mt-2 gap-1">
          <Text
            className="type-md-medium text-ui-fg-base"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          {product.subtitle && (
            <Text className="type-sm text-ui-fg-subtle">
              {product.subtitle}
            </Text>
          )}
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          {metaLine && (
            <Text className="type-sm text-ui-fg-subtle">
              {metaLine}
            </Text>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
