import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

const SANITY_REVALIDATION_SECRET = process.env.SANITY_REVALIDATION_SECRET

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")

  if (secret !== SANITY_REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  const body = await request.json()
  const docType = body?._type as string | undefined

  const tagMap: Record<string, string> = {
    hero: "sanity-hero",
    siteSettings: "sanity-site-settings",
    aboutPage: "sanity-about-page",
  }

  const tag = tagMap[docType ?? ""]
  if (tag) {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, tag })
  }

  return NextResponse.json({ revalidated: false })
}
