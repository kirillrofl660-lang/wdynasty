'use client'

import { useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react/box'
import { useReducedMotion } from '@/src/shared/lib/useReducedMotion'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
  className?: string
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 50,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -15% 0px' },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [reducedMotion])

  const translateX = direction === 'left' ? -distance : direction === 'right' ? distance : 0
  const translateY = direction === 'up' ? distance : direction === 'down' ? -distance : 0

  return (
    <Box
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0)' : `translate3d(${translateX}px, ${translateY}px, 0)`,
        transition: reducedMotion ? 'none' : `opacity ${duration}s ease ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
        willChange: reducedMotion ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </Box>
  )
}
