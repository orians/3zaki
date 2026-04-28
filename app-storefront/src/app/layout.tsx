import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Inter, Special_Elite } from "next/font/google"
import "styles/globals.css"
import { SanityLive } from "@lib/sanity/live"

export const dynamic = "force-dynamic"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-special-elite",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`${inter.variable} ${specialElite.variable}`}>
      <body className="font-sans">
        <main className="relative">{props.children}</main>
        <SanityLive />
      </body>
    </html>
  )
}
