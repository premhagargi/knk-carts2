"use client"

import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollBackground() {
  const { scrollYProgress } = useScroll()
  
  // Define color stages: Black -> Deep Red -> Electric Blue -> Dark
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#000000", "#440000", "#002244", "#0a0a0a"]
  )

  useMotionValueEvent(bgColor, "change", (latest) => {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = latest
    }
  })

  return null
}
