'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Box, Text } from '@chakra-ui/react'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  highlightColor?: string
}

export function TextReveal({
  text,
  className,
  delay = 0,
  highlightColor = 'brand.500',
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const words = container.querySelectorAll('.word')
    
    gsap.set(words, { 
      opacity: 0, 
      y: 20,
      rotateX: -90,
    })

    const animation = gsap.to(words, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.6,
      stagger: 0.05,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
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
  }, [delay, text])

  const words = text.split(' ')

  return (
    <Box ref={containerRef} className={className}>
      {words.map((word, index) => (
        <Box
          key={index}
          as="span"
          className="word"
          display="inline-block"
          mr={2}
          style={{ perspective: '1000px' }}
        >
          <Text as="span" display="inline-block">
            {word}
          </Text>
        </Box>
      ))}
    </Box>
  )
}
