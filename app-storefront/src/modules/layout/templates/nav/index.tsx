import { Suspense } from "react"
import Image from "next/image"
import { Search, ShoppingCart } from "lucide-react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { getSiteSettings } from "@lib/data/sanity"
import { urlFor } from "@lib/sanity/image"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavLanguageToggle from "@modules/layout/components/nav-language-toggle"

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

export default async function Nav() {
  const [regions, locales, currentLocale, siteSettings] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    getSiteSettings(),
  ])

  const lang = currentLocale?.split("-")[0]?.toLowerCase() ?? "en"
  const storeName =
    siteSettings?.storeName?.[lang as keyof typeof siteSettings.storeName] ??
    siteSettings?.storeName?.en ??
    "3 Zaķi"
  const logoUrl = siteSettings?.logo?.asset
    ? urlFor(siteSettings.logo).url()
    : null
  const logoAlt = siteSettings?.logo?.alt ?? storeName

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-[72px] mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container text-ui-fg-subtle grid grid-cols-[1fr_auto_1fr] items-center w-full h-full">

          {/* Left — nav links (desktop) | hamburger (mobile) */}
          <div className="flex items-center gap-x-8 h-full">
            <div className="small:hidden h-full">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
                copyrightName={siteSettings?.copyrightName}
              />
            </div>
            <div className="hidden small:flex items-center gap-x-8">
              {(NAV_LINKS[lang as keyof typeof NAV_LINKS] ?? NAV_LINKS.en).map(({ label, href }) => (
                <LocalizedClientLink
                  key={href}
                  href={href}
                  className="text-sm font-medium hover:text-ui-fg-base transition-colors"
                >
                  {label}
                </LocalizedClientLink>
              ))}
            </div>
          </div>

          {/* Centre — logo */}
          <LocalizedClientLink
            href="/"
            className="hover:opacity-80 transition-opacity"
            data-testid="nav-store-link"
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                height={24}
                width={104}
                unoptimized
                className="h-6 w-auto"
              />
            ) : (
              <span className="text-xl font-bold uppercase tracking-wide">{storeName}</span>
            )}
          </LocalizedClientLink>

          {/* Right — language + search + cart */}
          <div className="flex items-center justify-end gap-x-6 h-full">
            <div className="hidden small:flex items-center gap-x-6">
              <NavLanguageToggle currentLocale={currentLocale} />
              <button
                aria-label={lang === "lv" ? "Meklēt" : "Search"}
                className="flex items-center hover:text-ui-fg-base transition-colors"
              >
                <Search size={24} strokeWidth={2} />
              </button>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/cart"
                  data-testid="nav-cart-link"
                  aria-label={lang === "lv" ? "Grozs" : "Cart"}
                >
                  <ShoppingCart size={24} strokeWidth={2} className="block" />
                </LocalizedClientLink>
              }
            >
              <CartButton currentLocale={currentLocale} />
            </Suspense>
          </div>

        </nav>
      </header>
    </div>
  )
}
