"use client"

import React from "react"
import { NextStudio } from "next-sanity/studio"
import config from "@lib/sanity/sanity.config"

// Polyfill React.useEffectEvent for Sanity Studio (missing from React 19 stable)
if (!(React as any).useEffectEvent) {
  ;(React as any).useEffectEvent = function useEffectEvent(fn: Function) {
    const ref = React.useRef(fn)
    ref.current = fn
    return React.useCallback((...args: any[]) => ref.current(...args), [])
  }
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
