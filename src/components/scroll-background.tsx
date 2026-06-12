"use client"

import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

export default function ScrollBackground() {
  const { scrollYProgress } = useScroll()
  
  // Define color stages from the brand palette.
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#2e2f30", "#107098", "#0c7cb4", "#2e2f30"]
  )

  useMotionValueEvent(bgColor, "change", (latest) => {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = latest
    }
  })

  return null
}
