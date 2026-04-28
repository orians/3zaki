"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { useLocale } from "@lib/hooks/use-locale"
import { t } from "@lib/i18n/ui"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const lang = useLocale()

  const sortOptions = [
    { value: "created_at", label: t("sortLatest", lang) },
    { value: "price_asc", label: t("sortPriceLow", lang) },
    { value: "price_desc", label: t("sortPriceHigh", lang) },
  ]

  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <FilterRadioGroup
      title={t("sortBy", lang)}
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
