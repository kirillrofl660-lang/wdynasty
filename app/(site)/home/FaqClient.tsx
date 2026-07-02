'use client'

import { useState } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'

interface FaqItem {
  q: string
  a: string
}

export function FaqClient({ items }: { items: FaqItem[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <VStack gap={3} mt={12} align="stretch">
      {items.map((f, i) => {
        const open = openFaq === i
        return (
          <Box key={i} bg="white" borderRadius="20px" overflow="hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,.04)' }}>
            <Box
              as="button"
              w="full"
              textAlign="left"
              px={8}
              py={7}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={5}
              cursor="pointer"
              fontSize="18px"
              fontWeight="700"
              onClick={() => setOpenFaq(open ? null : i)}
              _hover={{ color: '#6b21d4' }}
            >
              <Text textAlign="left">{f.q}</Text>
              <Text color="#6b21d4" fontSize="26px" lineHeight={1} flexShrink={0} style={{ transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .3s' }}>+</Text>
            </Box>
            {open && (
              <Box px={8} pb={7} color="#595959" fontSize="16px" lineHeight="1.7">{f.a}</Box>
            )}
          </Box>
        )
      })}
    </VStack>
  )
}
