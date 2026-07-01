'use client'

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react/box'
import { useReducedMotion } from '@/src/shared/lib/useReducedMotion'

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
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true)
      return
    }

    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -20% 0px' },
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [reducedMotion])

  const items = Children.toArray(children)

  return (
    <Box ref={containerRef} className={className}>
      {items.map((child, i) => {
        if (!isValidElement(child)) return child
        const style = (child.props as any).style || {}
        return cloneElement(child as React.ReactElement<any>, {
          style: {
            ...style,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
            transition: reducedMotion ? 'none' : `opacity 0.6s ease ${delay + i * stagger}s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay + i * stagger}s`,
            willChange: reducedMotion ? 'auto' : 'opacity, transform',
          },
        })
      })}
    </Box>
  )
}
