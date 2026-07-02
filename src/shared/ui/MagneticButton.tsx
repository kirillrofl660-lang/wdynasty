'use client'

import { useRef, useState } from 'react'
import { Button } from '@chakra-ui/react/button'
import { useReducedMotion } from '@/src/shared/lib/useReducedMotion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  variant?: string
  size?: string
  colorPalette?: string
  onClick?: () => void
  color?: string
  w?: string
}

export function MagneticButton({
  children,
  className,
  variant,
  size = 'lg',
  colorPalette = 'brand',
  onClick,
  color = '',
  w,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()
  const [transform, setTransform] = useState('translate3d(0, 0, 0) scale(1)')

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion) return
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3

    setTransform(`translate3d(${x}px, ${y}px, 0) scale(1.05)`)
  }

  const handleMouseLeave = () => {
    setTransform('translate3d(0, 0, 0) scale(1)')
  }

  const handleMouseEnter = () => {
    if (reducedMotion) return
    setTransform('translate3d(0, 0, 0) scale(1.05)')
  }

  return (
    <Button
      ref={buttonRef}
      className={className}
      variant={variant as any}
      size={size as any}
      colorPalette={colorPalette as any}
      color={color}
      w={w}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform,
        transition: reducedMotion ? 'none' : 'transform 0.3s ease',
        willChange: reducedMotion ? 'auto' : 'transform',
      }}
    >
      {children}
    </Button>
  )
}
