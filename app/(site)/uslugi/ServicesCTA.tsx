'use client'

import { HStack } from '@chakra-ui/react'
import { MagneticButton } from '../../components/MagneticButton'

export function ServicesCTA() {
  return (
    <HStack gap={4} wrap="wrap" justify="center">
      <MagneticButton
        colorPalette="brand"
        size="lg"
        onClick={() => window.open('https://t.me/evilsleepyowl', '_blank', 'noopener,noreferrer')}
      >
        Написать в Telegram
      </MagneticButton>
    </HStack>
  )
}
