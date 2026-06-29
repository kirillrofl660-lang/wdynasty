'use client'

import { useEffect, useState } from 'react'
import { Box, Container, HStack, Text, Button } from '@chakra-ui/react'
import { Cookie } from 'lucide-react'

const STORAGE_KEY = 'wd-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) setVisible(true)
    } catch {
      // localStorage недоступен — показываем
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <Box
      position="fixed"
      left={0}
      right={0}
      bottom={0}
      zIndex={9999}
      bg="rgba(17, 17, 27, 0.95)"
      backdropFilter="blur(12px)"
      borderTop="1px solid rgba(255,255,255,0.08)"
      py={{ base: 3, md: 4 }}
      px={{ base: 4, md: 6 }}
    >
      <Container maxW="6xl">
        <HStack
          gap={{ base: 4, md: 6 }}
          align="center"
          justify="space-between"
          wrap={{ base: 'wrap', md: 'nowrap' }}
        >
          <HStack gap={3} align="start">
            <Box mt={0.5} color="white">
              <Cookie size={20} />
            </Box>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color="rgba(255,255,255,0.85)"
              lineHeight="1.6"
              maxW="760px"
            >
              Мы используем файлы cookie и Яндекс.Метрику для аналитики и улучшения работы сайта.
              Продолжая пользоваться сайтом, вы соглашаетесь с{' '}
              <a
                href="/privacy"
                style={{ color: '#ec4899', textDecoration: 'underline', textUnderlineOffset: '2px' }}
              >
                политикой конфиденциальности
              </a>
              .
            </Text>
          </HStack>

          <Button
            onClick={accept}
            size="md"
            flexShrink={0}
            style={{
              background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
              color: 'white',
              fontWeight: 600,
              borderRadius: '999px',
              padding: '0 24px',
            }}
            _hover={{ opacity: 0.9 }}
          >
            Хорошо
          </Button>
        </HStack>
      </Container>
    </Box>
  )
}
