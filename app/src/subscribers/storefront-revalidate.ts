import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

export default async function storefrontRevalidateHandler({
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  const storefrontUrl = process.env.STOREFRONT_URL
  const secret = process.env.REVALIDATION_SECRET

  if (!storefrontUrl || !secret) {
    console.warn("[revalidate] STOREFRONT_URL or REVALIDATION_SECRET not set — skipping revalidation")
    return
  }

  try {
    const res = await fetch(
      `${storefrontUrl}/api/revalidate/medusa?secret=${secret}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "product", id: data.id }),
      }
    )

    if (!res.ok) {
      console.error(`[revalidate] Storefront revalidation failed: ${res.status}`)
    }
  } catch (error) {
    console.error("[revalidate] Failed to reach storefront:", error)
  }
}

export const config: SubscriberConfig = {
  event: ["product.updated", "product.created"],
}
