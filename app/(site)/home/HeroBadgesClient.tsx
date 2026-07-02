'use client'

import { Box } from '@chakra-ui/react'

const techBadges = ['1С-Битрикс', 'Laravel', 'React', 'Next.js', 'Docker', 'DevOps']

const positions = [
  { t: techBadges[0], top: '12%', left: '8%' },
  { t: techBadges[1], top: '14%', right: '12%' },
  { t: techBadges[2], top: '40%', left: '4%' },
  { t: techBadges[3], top: '32%', right: '4%' },
  { t: techBadges[4], bottom: '18%', left: '10%' },
  { t: techBadges[5], bottom: '10%', right: '18%' },
]

export function HeroBadgesClient() {
  return (
    <Box display={{ base: 'none', lg: 'block' }} position="absolute" inset={0} zIndex={1} pointerEvents="none">
      {positions.map((b, i) => (
        <Box
          key={b.t}
          position="absolute"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            background: 'rgba(255,255,255,.65)',
            backdropFilter: 'blur(18px)',
            borderRadius: '30px',
            padding: '20px 30px',
            fontWeight: 800,
            fontSize: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,.06)',
            animation: 'wdfloat 6s ease-in-out infinite',
            animationDelay: `${i * 0.6}s`,
          }}
        >
          {b.t}
        </Box>
      ))}
    </Box>
  )
}
