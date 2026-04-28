"use client"

import { useEffect, useState } from "react"

/**
 * Reads the _medusa_locale cookie (httpOnly: false) on the client.
 * Returns "lv" or "en". Defaults to "en" during SSR / before hydration.
 */
export function useLocale(): "en" | "lv" {
  const [lang, setLang] = useState<"en" | "lv">("en")

  useEffect(() => {
    const match = document.cookie.match(/_medusa_locale=([^;]+)/)
    if (match) {
      const code = match[1].split("-")[0].toLowerCase()
      setLang(code === "lv" ? "lv" : "en")
    }
  }, [])

  return lang
}
