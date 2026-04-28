import Image from "next/image"
import { getSiteSettings } from "@lib/data/sanity"
import { getLocale } from "@lib/data/locale-actions"
import { urlFor } from "@lib/sanity/image"
import { Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const NAV_LINKS = {
  en: [
    { label: "Drinks", href: "/store" },
    { label: "About", href: "/about" },
    { label: "Private Label", href: "/private-label" },
  ],
  lv: [
    { label: "Dzērieni", href: "/store" },
    { label: "Par mums", href: "/about" },
    { label: "Private Label", href: "/private-label" },
  ],
}

export default async function Footer() {
  const [siteSettings, currentLocale] = await Promise.all([
    getSiteSettings(),
    getLocale(),
  ])

  const lang = currentLocale?.split("-")[0]?.toLowerCase() ?? "en"
  const storeName =
    siteSettings?.storeName?.[lang as keyof typeof siteSettings.storeName] ??
    siteSettings?.storeName?.en ??
    "3 Zaķi"
  const copyrightName = siteSettings?.copyrightName ?? storeName
  const links = NAV_LINKS[lang as keyof typeof NAV_LINKS] ?? NAV_LINKS.en
  const logoUrl = siteSettings?.logo?.asset
    ? urlFor(siteSettings.logo).url()
    : null
  const logoAlt = siteSettings?.logo?.alt ?? storeName

  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-4 small:flex-row small:items-center small:justify-between py-8">
          <LocalizedClientLink
            href="/"
            className="hover:opacity-80 transition-opacity"
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                height={28}
                width={100}
                unoptimized
                className="h-7 w-auto"
              />
            ) : (
              <span className="txt-compact-large-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase tracking-widest">
                {storeName}
              </span>
            )}
          </LocalizedClientLink>
          <ul className="flex flex-row gap-x-6 text-ui-fg-subtle txt-small">
            {links.map(({ label, href }) => (
              <li key={href}>
                <LocalizedClientLink
                  href={href}
                  className="hover:text-ui-fg-base transition-colors"
                >
                  {label}
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full py-4 border-t border-ui-border-base text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} {copyrightName}. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
