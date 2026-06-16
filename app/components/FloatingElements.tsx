'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Box, Flex } from '@chakra-ui/react'

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const icons = container.querySelectorAll('.floating-icon')

    icons.forEach((icon, index) => {
      // Floating animation
      gsap.to(icon, {
        y: 'random(-25, 25)',
        x: 'random(-15, 15)',
        rotation: 'random(-10, 10)',
        duration: 'random(4, 7)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.8,
      })

      // Pulse scale
      gsap.to(icon, {
        scale: 'random(0.9, 1.15)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5,
      })
    })

    return () => {
      gsap.killTweensOf(icons)
    }
  }, [])

  const techIcons = [
    { src: 'https://upload.wikimedia.org/wikipedia/ru/5/51/1c_bitrix_logo.svg', top: '15%', right: '8%', size: '55px', delay: 0, name: '1С-Битрикс' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Bitrix24-logo-ru.svg', top: '35%', left: '6%', size: '50px', delay: 0.5, name: 'Битрикс24' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg', bottom: '20%', right: '12%', size: '48px', delay: 1, name: 'Laravel' },
    { src: '/icons/lumen.svg', bottom: '15%', left: '8%', size: '52px', delay: 1.5, name: 'Lumen' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', top: '60%', right: '5%', size: '45px', delay: 2, name: 'React' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg', top: '25%', left: '12%', size: '50px', delay: 2.5, name: 'PHP' },
    { src: 'https://upload.wikimedia.org/wikipedia/ru/6/62/MySQL.svg', top: '50%', left: '5%', size: '45px', delay: 3, name: 'MySQL' },
  ]

  return (
    <Box
      ref={containerRef}
      position="absolute"
      inset={0}
      pointerEvents="none"
      overflow="hidden"
      zIndex={0}
    >
      {techIcons.map((item, index) => (
        <Flex
          key={index}
          className="floating-icon"
          position="absolute"
          top={item.top}
          left={item.left}
          right={item.right}
          bottom={item.bottom}
          opacity={0.15}
          filter="blur(0px)"
          boxShadow="0 8px 32px rgba(0,0,0,0.2)"
          borderRadius="14px"
          overflow="hidden"
        >
          <img 
            src={item.src} 
            alt={item.name}
            style={{ width: item.size, height: item.size, objectFit: 'contain', display: 'block', margin: 'auto' }}
          />
        </Flex>
      ))}
    </Box>
  )
}
