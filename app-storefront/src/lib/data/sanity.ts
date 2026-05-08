import "server-only"
import { defineQuery } from "next-sanity"
import { sanityFetch } from "@lib/sanity/live"

export type LocalizedString = {
  en: string
  lv: string
}

export type HeroData = {
  heading: LocalizedString
  subheading: LocalizedString
  ctaText: LocalizedString
  ctaHref: string
  backgroundImage: { asset: { _ref: string }; hotspot?: object } | null
  aboutImage: { asset: { _ref: string; _type: string }; alt?: string; hotspot?: object } | null
}

export type SiteSettingsData = {
  storeName: LocalizedString
  footerTagline: LocalizedString
  footerAddress: LocalizedString
  socialLinks: Array<{ platform: string; url: string }>
  logo: { asset: { _ref: string; _type: string }; alt?: string } | null
  copyrightName: string
  heroDecoration: { asset: { _ref: string; _type: string }; alt?: string } | null
}

export type AboutPageData = {
  heroHeadline: {
    line1: LocalizedString
    line2: LocalizedString
    line3: LocalizedString
  }
  heroImage: { asset: { _ref: string }; hotspot?: object } | null
  storyImage1: { asset: { _ref: string }; hotspot?: object } | null
  storyImage2: { asset: { _ref: string }; hotspot?: object } | null
  storyHeading: LocalizedString
  storyParagraphs: Array<LocalizedString>
  processHeading: LocalizedString
  processSteps: Array<{
    step: string
    title: LocalizedString
    body: LocalizedString
  }>
  teamHeading: LocalizedString
  teamIntro: LocalizedString
  teamMembers: Array<{
    name: string
    role: LocalizedString
    bio: LocalizedString
  }>
  valuesHeading: LocalizedString
  values: Array<{
    number: string
    image: { asset: { _ref: string }; hotspot?: object } | null
    title: LocalizedString
    body: LocalizedString
  }>
  contactHeading: LocalizedString
  address: LocalizedString
  email: string
  phone: string
}

export type PrivateLabelPageData = {
  heroHeading: LocalizedString
  heroSubheading: LocalizedString
  heroImage: { asset: { _ref: string }; hotspot?: object } | null
  introHeading: LocalizedString
  introImage1: { asset: { _ref: string }; hotspot?: object } | null
  introImage2: { asset: { _ref: string }; hotspot?: object } | null
  introParagraphs: Array<LocalizedString>
  benefits: Array<{ number: string; title: LocalizedString; body: LocalizedString }>
  processHeading: LocalizedString
  processSteps: Array<{ number: string; title: LocalizedString; body: LocalizedString }>
  ctaHeading: LocalizedString
  ctaBody: LocalizedString
  ctaButtonText: LocalizedString
  ctaEmail: string
}

export type StorePageData = {
  intro: LocalizedString
}

export type ProductPageData = {
  productInfoTabLabel: LocalizedString
  shippingTabLabel: LocalizedString
  volumeLabel: LocalizedString
  alcoholLabel: LocalizedString
  originLabel: LocalizedString
  vatLabel: LocalizedString
  shippingItems: Array<{ title: LocalizedString; body: LocalizedString }>
  relatedHeading: LocalizedString
  relatedSubheading: LocalizedString
}

const HERO_QUERY = defineQuery(`*[_type == "hero" && _id == "singleton-hero"][0]`)
const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings" && _id == "singleton-siteSettings"][0]`)
const ABOUT_PAGE_QUERY = defineQuery(`*[_type == "aboutPage" && _id == "singleton-aboutPage"][0]`)
const PRIVATE_LABEL_PAGE_QUERY = defineQuery(`*[_type == "privateLabelPage" && _id == "singleton-privateLabelPage"][0]`)
const STORE_PAGE_QUERY = defineQuery(`*[_type == "storePage"][0]`)
const PRODUCT_PAGE_QUERY = defineQuery(`*[_type == "productPage"][0]`)

export async function getHero(): Promise<HeroData | null> {
  const { data } = await sanityFetch({ query: HERO_QUERY })
  return data as HeroData | null
}

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY })
  return data as SiteSettingsData | null
}

export async function getAboutPage(): Promise<AboutPageData | null> {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY })
  return data as AboutPageData | null
}

export async function getPrivateLabelPage(): Promise<PrivateLabelPageData | null> {
  const { data } = await sanityFetch({ query: PRIVATE_LABEL_PAGE_QUERY })
  return data as PrivateLabelPageData | null
}

export async function getStorePage(): Promise<StorePageData | null> {
  const { data } = await sanityFetch({ query: STORE_PAGE_QUERY })
  return data as StorePageData | null
}

export async function getProductPage(): Promise<ProductPageData | null> {
  const { data } = await sanityFetch({ query: PRODUCT_PAGE_QUERY })
  return data as ProductPageData | null
}
