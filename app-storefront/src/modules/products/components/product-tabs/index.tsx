"use client"

import { Truck, RefreshCw, RotateCcw } from "lucide-react"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ShippingItem = {
  title: string
  body: string
}

type ProductTabsStrings = {
  productInfoTabLabel: string
  shippingTabLabel: string
  volumeLabel: string
  alcoholLabel: string
  originLabel: string
  shippingItems: ShippingItem[]
}

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
  strings: ProductTabsStrings
}

const ICONS = [Truck, RefreshCw, RotateCcw]

const ProductTabs = ({ product, strings }: ProductTabsProps) => {
  const tabs = [
    {
      label: strings.productInfoTabLabel,
      component: <ProductInfoTab product={product} strings={strings} />,
    },
    {
      label: strings.shippingTabLabel,
      component: <ShippingInfoTab items={strings.shippingItems} />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({
  product,
  strings,
}: {
  product: HttpTypes.StoreProduct
  strings: ProductTabsStrings
}) => {
  const metadata = product.metadata as Record<string, string> | null

  return (
    <div className="py-8">
      <div className="flex flex-col gap-y-4">
        {metadata?.volume_ml && (
          <div>
            <p className="type-md-semibold">{strings.volumeLabel}</p>
            <p className="type-md">{metadata.volume_ml} ml</p>
          </div>
        )}
        {metadata?.alcohol_content && (
          <div>
            <p className="type-md-semibold">{strings.alcoholLabel}</p>
            <p className="type-md">{metadata.alcohol_content}%</p>
          </div>
        )}
        {product.origin_country && (
          <div>
            <p className="type-md-semibold">{strings.originLabel}</p>
            <p className="type-md">{product.origin_country}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const ShippingInfoTab = ({ items }: { items: ShippingItem[] }) => {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 gap-y-8">
        {items.map((item, i) => {
          const Icon = ICONS[i] ?? Truck
          return (
            <div key={i} className="flex items-start gap-x-3">
              <Icon size={24} strokeWidth={2} className="shrink-0 mt-0.5" />
              <div>
                <p className="type-md-semibold">{item.title}</p>
                <p className="type-md max-w-sm">{item.body}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductTabs
