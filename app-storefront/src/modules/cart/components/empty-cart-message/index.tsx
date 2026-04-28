import { Heading, Text } from "@medusajs/ui"
import { getLocale } from "@lib/data/locale-actions"
import { t } from "@lib/i18n/ui"
import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = async () => {
  const locale = await getLocale()
  const lang = locale?.split("-")[0]?.toLowerCase() === "lv" ? "lv" : "en"

  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        {t("cart", lang)}
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        {t("cartEmpty", lang)}
      </Text>
      <div>
        <InteractiveLink href="/store">{t("exploreProducts", lang)}</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
