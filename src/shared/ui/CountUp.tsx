'use client'

import { useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react/box'
import { useReducedMotion } from '@/src/shared/lib/useReducedMotion'

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

function easeOutQuad(t: number) {
  return t * (2 - t)
}

export function CountUp({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(reducedMotion ? end : 0)
  const [started, setStarted] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setCount(end)
      setStarted(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -15% 0px' },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [started, reducedMotion])

  useEffect(() => {
    if (!started) return

    let raf: number
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuad(progress)
      setCount(Math.round(end * eased))

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [started, end, duration])

  return (
    <Box ref={ref} as="span" className={className}>
      {prefix}{count}{suffix}
    </Box>
  )
}
