'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Box } from '@chakra-ui/react'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const animation = gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === element) {
          st.kill()
        }
      })
    }
  }, [speed])

  return (
    <Box ref={ref} className={className}>
      {children}
    </Box>
  )
}
