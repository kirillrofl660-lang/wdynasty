'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Box } from '@chakra-ui/react'

gsap.registerPlugin(ScrollTrigger)

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function CountUp({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const obj = { value: 0 }

    const animation = gsap.to(obj, {
      value: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setCount(Math.round(obj.value))
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
  }, [end, duration])

  return (
    <Box ref={ref} as="span" className={className}>
      {prefix}{count}{suffix}
    </Box>
  )
}
