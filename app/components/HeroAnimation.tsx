'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Box } from '@chakra-ui/react'

interface HeroAnimationProps {
  children: React.ReactNode
}

export function HeroAnimation({ children }: HeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Badge animation
    tl.fromTo(
      container.querySelector('.hero-badge'),
      { opacity: 0, y: -30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6 }
    )

    // Heading animation with split
    tl.fromTo(
      container.querySelector('.hero-heading'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    )

    // Description
    tl.fromTo(
      container.querySelector('.hero-description'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )

    // Buttons
    tl.fromTo(
      container.querySelector('.hero-buttons'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    )

    // Social links
    tl.fromTo(
      container.querySelector('.hero-social'),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4 },
      '-=0.2'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <Box ref={containerRef}>
      {children}
    </Box>
  )
}
