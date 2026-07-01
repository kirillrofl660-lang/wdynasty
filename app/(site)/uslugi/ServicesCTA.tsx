'use client'

import { HStack } from '@chakra-ui/react/stack'
import { MagneticButton } from '@/src/shared/ui'

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
