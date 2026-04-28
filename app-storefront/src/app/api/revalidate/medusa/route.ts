import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")

  if (!REVALIDATION_SECRET || secret !== REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  revalidatePath("/", "layout")

  return NextResponse.json({ revalidated: true })
}
