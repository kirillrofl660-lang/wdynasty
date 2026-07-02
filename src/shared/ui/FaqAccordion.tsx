'use client'

import { useState } from 'react'
import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'
import { VStack } from '@chakra-ui/react/stack'

interface FaqItem {
  question: string
  answer: React.ReactNode
}

const C = {
  p: '#6b21d4',
  muted: '#555',
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <VStack gap={3} align="stretch">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <Box key={i} bg="white" borderRadius="20px" overflow="hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,.04)' }}>
            <Box
              as="button"
              w="full"
              textAlign="left"
              px={{ base: 5, md: 8 }}
              py={{ base: 5, md: 7 }}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={4}
              cursor="pointer"
              fontSize={{ base: '16px', md: '18px' }}
              fontWeight="700"
              onClick={() => setOpen(isOpen ? null : i)}
              _hover={{ color: C.p }}
            >
              <Text textAlign="left" lineHeight="1.4">{item.question}</Text>
              <Text color={C.p} fontSize="26px" lineHeight={1} flexShrink={0} style={{ transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .3s' }}>+</Text>
            </Box>
            {isOpen && (
              <Box px={{ base: 5, md: 8 }} pb={{ base: 5, md: 7 }} color={C.muted} fontSize="16px" lineHeight="1.7">
                {item.answer}
              </Box>
            )}
          </Box>
        )
      })}
    </VStack>
  )
}
