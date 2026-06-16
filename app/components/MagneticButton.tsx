'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Button } from '@chakra-ui/react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  variant?: string
  size?: string
  colorPalette?: string
  onClick?: () => void
  color?: string
}

export function MagneticButton({
  children,
  className,
  variant,
  size = 'lg',
  colorPalette = 'brand',
  onClick,
  color=""
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    const button = buttonRef.current
    if (!button) return

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <Button
      ref={buttonRef}
      className={className}
      variant={variant as any}
      size={size as any}
      colorPalette={colorPalette as any}
      color={color}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      transform={isHovered ? 'scale(1.05)' : 'scale(1)'}
      transition="transform 0.3s ease"
    >
      {children}
    </Button>
  )
}
