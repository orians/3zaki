import { HttpTypes } from "@medusajs/types"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4">
        <h2
          className="type-xl text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </h2>

        {product.description && (
          <p
            className="type-md text-ui-fg-subtle whitespace-pre-line"
            data-testid="product-description"
          >
            {product.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
