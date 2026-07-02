export const revalidate = 300

import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Box } from '@chakra-ui/react/box'
import { Container } from '@chakra-ui/react/container'
import { Heading } from '@chakra-ui/react/heading'
import { Text } from '@chakra-ui/react/text'
import { VStack, HStack } from '@chakra-ui/react/stack'
import { SimpleGrid } from '@chakra-ui/react/simple-grid'
import { Card, CardBody } from '@chakra-ui/react/card'
import { Badge } from '@chakra-ui/react/badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ScrollReveal } from '@/src/shared/ui'
import { ServicesCTA } from './ServicesCTA'

const C = {
  cream: '#f5f0e6',
  creamDark: '#ede7d6',
  brand: '#8b1c2c',
  brandHover: '#6e1420',
  gold: '#b8852a',
  text: '#1a0f0a',
  muted: '#5a4a3a',
  line: '#d8cfb8',
  white: '#ffffff',
} as const

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

function Ornament() {
  return (
    <HStack gap={3} aria-hidden="true" w="220px" mx="auto">
      <Box flex={1} h="1px" style={{ background: `linear-gradient(90deg, transparent, ${C.gold})` }} />
      <Box w="8px" h="8px" flexShrink={0} style={{ background: C.gold, transform: 'rotate(45deg)', borderRadius: '1px' }} />
      <Box flex={1} h="1px" style={{ background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
    </HStack>
  )
}

export const metadata: Metadata = {
  title: 'Услуги | Династия Разработчиков',
  description: 'Корпоративная веб-разработка под ключ: интернет-магазины на 1С-Битрикс, порталы Битрикс24, Laravel, React, DevOps.',
  alternates: { canonical: 'https://wdynasty.ru/uslugi' },
  openGraph: {
    title: 'Услуги — Династия Разработчиков',
    description: 'Корпоративная веб-разработка под ключ.',
    url: 'https://wdynasty.ru/uslugi',
    images: [{ url: '/api/og', width: 1200, height: 630 }],
  },
}

async function fetchServices() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'services',
      where: { status: { equals: 'published' } },
      limit: 50,
    })
    return result.docs as any[]
  } catch (err) {
    console.warn('[ServicesPage] DB unavailable during build, returning empty:', err)
    return []
  }
}

export default async function ServicesPage() {
  const services = await fetchServices()

  return (
    <>
      {/* Hero */}
      <Box bg={C.cream} color={C.text} py={{ base: 20, md: 28 }} px={4} position="relative" overflow="hidden" style={{ borderBottom: `1px solid ${C.line}` }}>
        <Container maxW="6xl" position="relative">
          <VStack gap={5} textAlign="center">
            <Text fontSize="12px" fontWeight="700" letterSpacing="3px" textTransform="uppercase" color={C.gold} mb={1}>
              Что мы делаем
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              fontWeight="700"
              lineHeight="1.1"
              style={{ fontFamily: 'var(--font-philosopher, Philosopher, Georgia, serif)' }}
            >
              Наши{' '}
              <Text as="span" color={C.brand} style={{ fontFamily: 'var(--font-yeseva, Yeseva One, Georgia, serif)' }}>
                услуги
              </Text>
            </Heading>
            <Ornament />
            <Text fontSize={{ base: 'md', md: 'lg' }} color={C.muted} maxW="2xl" lineHeight="1.7">
              Полный цикл корпоративной разработки — от интернет-магазина до высоконагруженной инфраструктуры
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Список услуг из CMS */}
      {services.length > 0 && (
        <Box py={{ base: 16, md: 24 }} px={4} bg={C.creamDark}>
          <Container maxW="6xl">
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 6, md: 8 }}>
              {services.map((s, i) => (
                <ScrollReveal key={s.slug}>
                  <Link href={`/uslugi/${s.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <Card.Root
                      h="full"
                      bg={C.white}
                      borderRadius="16px"
                      border="1px solid"
                      borderColor={C.line}
                      cursor="pointer"
                      _hover={{ borderColor: C.gold, shadow: 'md', transform: 'translateY(-4px)' }}
                      transition="all 0.25s"
                      style={{ boxShadow: '0 4px 20px rgba(26,15,10,0.04)' }}
                    >
                      <CardBody p={{ base: 6, md: 8 }}>
                        <VStack align="start" gap={4} h="full">
                          <HStack gap={3} w="full" pb={3} style={{ borderBottom: `1px solid ${C.line}` }}>
                            <Text fontSize="2xl" fontWeight="700" color={C.gold} style={{ fontFamily: 'var(--font-yeseva, Yeseva One, Georgia, serif)' }}>
                              {ROMAN[i] ?? String(i + 1)}
                            </Text>
                            <Badge colorPalette="brand" size="sm" bg="transparent" color={C.brand} border="1px solid" borderColor={C.line} borderRadius="full" px={3}>
                              {s.hero?.badge ?? 'Услуга'}
                            </Badge>
                          </HStack>
                          <Heading as="h2" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="700" color={C.text} style={{ fontFamily: 'var(--font-philosopher, Philosopher, Georgia, serif)' }}>
                            {s.title}
                          </Heading>
                          {s.excerpt && (
                            <Text color={C.muted} fontSize="sm" lineClamp={3} lineHeight="1.7">
                              {s.excerpt}
                            </Text>
                          )}
                          <HStack mt="auto" pt={4} color={C.brand} fontWeight="600" fontSize="sm">
                            <Text>Подробнее</Text>
                            <ArrowRight size={16} />
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card.Root>
                  </Link>
                </ScrollReveal>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      )}

      {/* Если услуг нет — заглушка */}
      {services.length === 0 && (
        <Box py={32} px={4} textAlign="center" bg={C.creamDark}>
          <Container maxW="xl">
            <VStack gap={4}>
              <Text fontSize="xl" color={C.muted}>Услуги скоро появятся</Text>
              <Text color={C.muted}>Добавьте первую услугу в разделе администратора</Text>
            </VStack>
          </Container>
        </Box>
      )}

      {/* CTA */}
      <Box py={{ base: 16, md: 24 }} px={4} bg={C.cream} style={{ borderTop: `1px solid ${C.line}` }}>
        <Container maxW="4xl">
          <ScrollReveal>
            <VStack gap={6} textAlign="center">
              <Heading
                fontSize={{ base: '2xl', md: '3xl' }}
                color={C.text}
                style={{ fontFamily: 'var(--font-philosopher, Philosopher, Georgia, serif)' }}
              >
                Не нашли нужную услугу?
              </Heading>
              <Ornament />
              <Text color={C.muted} maxW="xl" lineHeight="1.7">
                Расскажите о задаче — мы найдём решение и предложим варианты
              </Text>
              <ServicesCTA />
            </VStack>
          </ScrollReveal>
        </Container>
      </Box>
    </>
  )
}
