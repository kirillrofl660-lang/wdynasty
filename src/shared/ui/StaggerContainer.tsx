'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Box } from '@chakra-ui/react'

gsap.registerPlugin(ScrollTrigger)

interface StaggerContainerProps {
  children: React.ReactNode
  stagger?: number
  delay?: number
  className?: string
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  delay = 0,
  className,
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.children
    if (items.length === 0) return

    gsap.set(items, { opacity: 0, y: 30 })

    const animation = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === container) {
          st.kill()
        }
      })
    }
  }, [stagger, delay])

  return (
    <Box ref={containerRef} className={className}>
      {children}
    </Box>
  )
}
