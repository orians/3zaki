"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { updateLocale } from "@lib/data/locale-actions"

type Props = {
  currentLocale: string | null
}

const NavLanguageToggle = ({ currentLocale }: Props) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const lang = currentLocale?.split("-")[0]?.toLowerCase() ?? "en"
  const targetLocale = lang === "lv" ? "en-US" : "lv-LV"
  const label = lang === "lv" ? "In English" : "Latviski"

  const handleClick = () => {
    startTransition(async () => {
      await updateLocale(targetLocale)
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-sm font-medium hover:text-ui-fg-base transition-colors disabled:opacity-50"
    >
      {label}
    </button>
  )
}

export default NavLanguageToggle
