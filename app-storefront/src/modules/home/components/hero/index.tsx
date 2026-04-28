import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import { HeroData } from "@lib/data/sanity"
import { urlFor } from "@lib/sanity/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  data: HeroData | null
  lang: string
}

const Hero = ({ data, lang }: Props) => {
  const heading =
    data?.heading?.[lang as keyof typeof data.heading] ??
    data?.heading?.en ??
    "3 Zaķi"
  const subheading =
    data?.subheading?.[lang as keyof typeof data.subheading] ??
    data?.subheading?.en ??
    ""
  const ctaText =
    data?.ctaText?.[lang as keyof typeof data.ctaText] ??
    data?.ctaText?.en ??
    "Shop Now"
  const ctaHref = data?.ctaHref ?? "/store"
  const bgImageUrl = data?.backgroundImage
    ? urlFor(data.backgroundImage).width(1600).quality(80).auto("format").url()
    : null

  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      {bgImageUrl && (
        <Image
          src={bgImageUrl}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-ui-fg-base font-normal"
          >
            {heading}
          </Heading>
          {subheading && (
            <Heading
              level="h2"
              className="text-3xl leading-10 text-ui-fg-subtle font-normal"
            >
              {subheading}
            </Heading>
          )}
        </span>
        <LocalizedClientLink href={ctaHref}>
          <Button variant="secondary">{ctaText}</Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
