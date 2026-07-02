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
      <Box bg="brand.950" color="white" py={{ base: 20, md: 24 }} px={4} position="relative" overflow="hidden">
        <Box position="absolute" top="0" right="0" w="50%" h="full" bg="brand.500" opacity="0.08" style={{ filter: 'blur(100px)' }} pointerEvents="none" />
        <Container maxW="6xl" position="relative">
          <VStack gap={5} textAlign="center">
            <Badge colorPalette="brand" size="lg" px={4} py={1} borderRadius="full">
              Что мы делаем
            </Badge>
            <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} fontWeight="bold" lineHeight="1.1">
              Наши{' '}
              <Text as="span" color="brand.400">услуги</Text>
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="whiteAlpha.800" maxW="2xl">
              Полный цикл корпоративной разработки — от интернет-магазина до высоконагруженной инфраструктуры
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Список услуг из CMS */}
      {services.length > 0 && (
        <Box py={20} px={4} bg="white">
          <Container maxW="6xl">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {services.map((s) => (
                <ScrollReveal key={s.slug}>
                  <Link href={`/uslugi/${s.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <Card.Root
                      h="full"
                      border="1px solid"
                      borderColor="gray.100"
                      cursor="pointer"
                      _hover={{ borderColor: 'brand.400', shadow: 'lg', transform: 'translateY(-4px)' }}
                      transition="all 0.25s"
                    >
                      <CardBody p={8}>
                        <VStack align="start" gap={4} h="full">
                          <Badge colorPalette="brand" size="sm">
                            {s.hero?.badge ?? 'Услуга'}
                          </Badge>
                          <Heading as="h2" fontSize="xl" fontWeight="bold">
                            {s.title}
                          </Heading>
                          {s.hero?.description && (
                            <Text color="gray.600" fontSize="sm" lineClamp={3}>
                              {s.hero.description}
                            </Text>
                          )}
                          <HStack mt="auto" pt={2} color="brand.500" fontWeight="medium" fontSize="sm">
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
        <Box py={32} px={4} textAlign="center">
          <Container maxW="xl">
            <VStack gap={4}>
              <Text fontSize="xl" color="gray.500">Услуги скоро появятся</Text>
              <Text color="gray.400">Добавьте первую услугу в разделе администратора</Text>
            </VStack>
          </Container>
        </Box>
      )}

      {/* CTA */}
      <Box py={20} px={4} bg="gray.50">
        <Container maxW="4xl">
          <ScrollReveal>
            <VStack gap={6} textAlign="center">
              <Heading fontSize={{ base: '2xl', md: '3xl' }}>
                Не нашли нужную услугу?
              </Heading>
              <Text color="gray.600" maxW="xl">
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
