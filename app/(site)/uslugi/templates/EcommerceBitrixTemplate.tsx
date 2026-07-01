'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Box } from '@chakra-ui/react/box'
import { Container } from '@chakra-ui/react/container'
import { Heading } from '@chakra-ui/react/heading'
import { Text } from '@chakra-ui/react/text'
import { VStack, HStack } from '@chakra-ui/react/stack'
import { SimpleGrid } from '@chakra-ui/react/simple-grid'
import { Card, CardBody } from '@chakra-ui/react/card'
import { Badge } from '@chakra-ui/react/badge'
import { Flex } from '@chakra-ui/react/flex'
import { Separator } from '@chakra-ui/react/separator'
import {
  ShoppingCart, CreditCard, Truck, Package, BarChart,
  Zap, Shield, Users, Settings, Server, Code, Database,
  CheckCircle, ArrowRight,
} from 'lucide-react'
import { ScrollReveal, MagneticButton } from '@/src/shared/ui'
import { LeadForm } from '@/src/shared/ui/LeadForm'

const HSlider = dynamic(() => import('@/src/shared/ui/HSlider').then((m) => m.HSlider), { ssr: false })

const ICONS: Record<string, React.ElementType> = {
  ShoppingCart, CreditCard, Truck, Package, BarChart,
  Zap, Shield, Users, Settings, Server, Code, Database,
}

interface ServiceData {
  title: string
  hero?: {
    badge?: string
    title?: string
    titleHighlight?: string
    description?: string
    stats?: { value: string; label: string }[]
  }
  features?: { title: string; description: string; icon?: string }[]
  workStages?: { num: string; title: string; desc: string }[]
  prices?: {
    name: string
    price: string
    term: string
    popular?: boolean
    features?: { text: string }[]
  }[]
  includedInPrice?: { text: string }[]
}

interface Props {
  service: ServiceData
  relatedCases?: any[]
}

export function EcommerceBitrixTemplate({ service, relatedCases = [] }: Props) {
  const hero = service.hero ?? {}
  const features = service.features ?? []
  const workStages = service.workStages ?? []
  const prices = service.prices ?? []
  const included = service.includedInPrice ?? []

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  const priceCard = (p: NonNullable<Props['service']['prices']>[number]) => (
    <Card.Root h="full" w="full" border="2px solid" borderColor={p.popular ? 'brand.500' : 'gray.100'} position="relative" _hover={{ shadow: 'lg' }} transition="all 0.2s">
      {p.popular && (
        <Badge colorPalette="brand" position="absolute" top="-3" left="50%" transform="translateX(-50%)" px={4} borderRadius="full">
          Популярный
        </Badge>
      )}
      <CardBody p={8}>
        <VStack align="start" gap={6}>
          <VStack align="start" gap={1}>
            <Text fontWeight="bold" fontSize="xl">{p.name}</Text>
            <Text fontSize="2xl" fontWeight="bold" color="brand.500">{p.price}</Text>
            <Text fontSize="sm" color="gray.500">{p.term}</Text>
          </VStack>
          <VStack align="start" gap={2} w="full">
            {(p.features ?? []).map((f) => (
              <HStack key={f.text} gap={2}>
                <CheckCircle size={16} color="var(--color-brand-500)" />
                <Text fontSize="sm">{f.text}</Text>
              </HStack>
            ))}
          </VStack>
          <MagneticButton w="full" colorPalette={p.popular ? 'brand' : 'gray'} variant={p.popular ? 'solid' : 'outline'} onClick={scrollToContact}>
            Обсудить <ArrowRight size={16} />
          </MagneticButton>
        </VStack>
      </CardBody>
    </Card.Root>
  )

  return (
    <>
      {/* Hero */}
      <Box bg="brand.950" color="white" py={{ base: 20, md: 28 }} px={4} position="relative" overflow="hidden">
        <Box position="absolute" top="0" right="0" w="50%" h="full" bg="brand.500" opacity="0.08" style={{ filter: 'blur(100px)' }} pointerEvents="none" />
        <Container maxW="6xl" position="relative">
          <VStack gap={6} textAlign="center" align="center">
            {hero.badge && (
              <Badge colorPalette="brand" size="lg" px={4} py={1} borderRadius="full">
                {hero.badge}
              </Badge>
            )}
            <Heading as="h1" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight="bold" lineHeight="1.1" maxW="4xl">
              {hero.title ?? service.title}{' '}
              {hero.titleHighlight && (
                <Text as="span" color="brand.400">{hero.titleHighlight}</Text>
              )}
            </Heading>
            {hero.description && (
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="whiteAlpha.800" maxW="2xl">
                {hero.description}
              </Text>
            )}
            <HStack gap={4} pt={2} wrap="wrap" justify="center">
              <MagneticButton size="lg" colorPalette="brand" onClick={scrollToContact}>
                Обсудить проект
              </MagneticButton>
              <MagneticButton
                size="lg" variant="outline" colorPalette="gray" color="brand.400"
                onClick={() => window.open('https://t.me/evilsleepyowl', '_blank', 'noopener,noreferrer')}
              >
                Написать в Telegram
              </MagneticButton>
            </HStack>
            {hero.stats && hero.stats.length > 0 && (
              <HStack gap={8} pt={4} wrap="wrap" justify="center">
                {hero.stats.map((s) => (
                  <VStack key={s.label} gap={0}>
                    <Text fontSize="3xl" fontWeight="bold" color="brand.400">{s.value}</Text>
                    <Text fontSize="sm" color="whiteAlpha.700">{s.label}</Text>
                  </VStack>
                ))}
              </HStack>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Функционал */}
      {features.length > 0 && (
        <>
          <Separator />
          <Box py={20} px={4} bg="white">
            <Container maxW="6xl">
              <ScrollReveal>
                <VStack gap={12}>
                  <VStack gap={3} textAlign="center">
                    <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }}>Что входит в разработку</Heading>
                    <Text color="gray.600" maxW="2xl">Полный цикл — от дизайна до запуска и поддержки</Text>
                  </VStack>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
                    {features.map((f) => {
                      const IconComp = ICONS[f.icon ?? ''] ?? Package
                      return (
                        <ScrollReveal key={f.title}>
                          <Card.Root h="full" border="1px solid" borderColor="gray.100" _hover={{ borderColor: 'brand.200', shadow: 'md' }} transition="all 0.2s">
                            <CardBody p={6}>
                              <VStack align="start" gap={3}>
                                <Flex w={12} h={12} borderRadius="xl" bg="brand.50" align="center" justify="center">
                                  <IconComp size={22} color="var(--color-brand-500)" />
                                </Flex>
                                <Heading as="h3" fontSize="lg" fontWeight="semibold">{f.title}</Heading>
                                <Text color="gray.600" fontSize="sm">{f.description}</Text>
                              </VStack>
                            </CardBody>
                          </Card.Root>
                        </ScrollReveal>
                      )
                    })}
                  </SimpleGrid>
                </VStack>
              </ScrollReveal>
            </Container>
          </Box>
        </>
      )}

      {/* Этапы */}
      {workStages.length > 0 && (
        <>
          <Separator />
          <Box py={20} px={4} bg="brand.950" color="white" position="relative" overflow="hidden">
            <Box position="absolute" bottom="-20%" left="-10%" w="500px" h="500px" bg="brand.500" opacity="0.05" borderRadius="full" style={{ filter: 'blur(80px)' }} pointerEvents="none" />
            <Container maxW="6xl" position="relative">
              <ScrollReveal>
                <VStack gap={14}>
                  <VStack gap={3} textAlign="center">
                    <Text fontSize="sm" fontWeight="semibold" color="brand.400" textTransform="uppercase" letterSpacing="wider">
                      Процесс работы
                    </Text>
                    <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }} color="white">
                      Как мы работаем
                    </Heading>
                    <Text color="whiteAlpha.700" maxW="xl">
                      Прозрачный процесс без сюрпризов — вы знаете что происходит на каждом шаге
                    </Text>
                  </VStack>

                  <SimpleGrid columns={{ base: 1, sm: 2, lg: workStages.length > 4 ? 4 : workStages.length }} gap={4} w="full">
                    {workStages.map((s, i) => {
                      const stepNum = (i + 1).toString().padStart(2, '0')
                      return (
                      <ScrollReveal key={i}>
                        <Box
                          bg="whiteAlpha.50"
                          border="1px solid"
                          borderColor="whiteAlpha.100"
                          borderRadius="2xl"
                          p={6}
                          position="relative"
                          overflow="hidden"
                          h="full"
                          _hover={{ bg: 'whiteAlpha.100', borderColor: 'brand.700' }}
                          transition="all 0.2s"
                        >
                          {/* Декоративный большой номер */}
                          <Text
                            position="absolute"
                            bottom="-10px"
                            right="12px"
                            fontSize="8xl"
                            fontWeight="black"
                            color="whiteAlpha.50"
                            lineHeight={1}
                            userSelect="none"
                            pointerEvents="none"
                          >
                            {stepNum}
                          </Text>
                          <VStack align="start" gap={3} position="relative" zIndex={1}>
                            <Flex
                              w={9} h={9} borderRadius="lg"
                              bg="brand.500"
                              align="center" justify="center"
                              fontWeight="bold" fontSize="xs"
                              color="white"
                              flexShrink={0}
                            >
                              {stepNum}
                            </Flex>
                            <Text fontWeight="bold" fontSize="md" color="white" lineHeight="short">
                              {s.title}
                            </Text>
                            <Text color="whiteAlpha.600" fontSize="sm" lineHeight="tall">
                              {s.desc}
                            </Text>
                          </VStack>
                        </Box>
                      </ScrollReveal>
                      )
                    })}
                  </SimpleGrid>
                </VStack>
              </ScrollReveal>
            </Container>
          </Box>
        </>
      )}

      {/* Цены */}
      {prices.length > 0 && (
        <>
          <Separator />
          <Box py={20} px={4} bg="white">
            <Container maxW="6xl">
              <ScrollReveal>
                <VStack gap={12}>
                  <VStack gap={3} textAlign="center">
                    <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }}>Стоимость разработки</Heading>
                    <Text color="gray.600" maxW="2xl">Фиксированная цена. Никаких скрытых платежей</Text>
                  </VStack>
                  {prices.length >= 4 ? (
                    <Box w="full">
                      <HSlider>
                        {prices.map((p) => (
                          <Box
                            key={p.name}
                            flex={{ base: '0 0 86%', sm: '0 0 60%', md: '0 0 calc(50% - 12px)', lg: '0 0 calc(33.333% - 16px)' }}
                            display="flex"
                            pt={2}
                            style={{ scrollSnapAlign: 'start' }}
                          >
                            {priceCard(p)}
                          </Box>
                        ))}
                      </HSlider>
                    </Box>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full" alignItems="start">
                      {prices.map((p) => (
                        <Box key={p.name}>{priceCard(p)}</Box>
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>
              </ScrollReveal>
            </Container>
          </Box>
        </>
      )}

      {/* Включено во все тарифы */}
      {included.length > 0 && (
        <>
          <Separator />
          <Box py={20} px={4} bg="brand.950" color="white">
            <Container maxW="4xl">
              <ScrollReveal>
                <VStack gap={8} textAlign="center">
                  <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }}>В любом тарифе включено</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={3} w="full" textAlign="left">
                    {included.map((item) => (
                      <HStack key={item.text} gap={3}>
                        <CheckCircle size={18} color="var(--color-accent-500)" style={{ flexShrink: 0 }} />
                        <Text color="whiteAlpha.900">{item.text}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </VStack>
              </ScrollReveal>
            </Container>
          </Box>
        </>
      )}

      <Separator />

      {/* Похожие кейсы */}
      {relatedCases.length > 0 && (
        <>
          <Box py={20} px={4}>
            <Container maxW="6xl">
              <ScrollReveal>
                <VStack gap={8} align="start">
                  <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }}>
                    Реализованные кейсы
                  </Heading>
                  <Text color="gray.600" maxW="2xl">
                    Примеры задач, которые мы уже решали в рамках этой услуги, с ценами и факторами, влияющими на стоимость.
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
                    {relatedCases.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/cases/${c.slug}`}
                        style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                      >
                        <Box
                          bg="white"
                          borderRadius="20px"
                          p={6}
                          h="full"
                          style={{ border: '1px solid rgba(0,0,0,0.06)' }}
                          transition="transform 0.2s, box-shadow 0.2s"
                          _hover={{ transform: 'translateY(-4px)', boxShadow: '0 20px 50px rgba(107,33,212,.12)' }}
                        >
                          <Heading as="h3" fontSize="lg" fontWeight="600" color="#111" mb={2} lineHeight="1.3">
                            {c.title}
                          </Heading>
                          {c.searchQuery && (
                            <Text fontSize="sm" color="#757575" fontStyle="italic" mb={3}>
                              «{c.searchQuery}»
                            </Text>
                          )}
                          {c.excerpt && (
                            <Text fontSize="sm" color="#555" lineHeight="1.6" mb={4}>
                              {c.excerpt}
                            </Text>
                          )}
                          <HStack justify="space-between" mt="auto" pt={4} style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                            <Text fontSize="sm" fontWeight="600" color="#111">
                              {c.basePrice ?? 'Цена по запросу'}
                            </Text>
                            <Text fontSize="sm" color="#6b21d4" fontWeight="500">
                              Подробнее →
                            </Text>
                          </HStack>
                        </Box>
                      </Link>
                    ))}
                  </SimpleGrid>
                </VStack>
              </ScrollReveal>
            </Container>
          </Box>
          <Separator />
        </>
      )}

      {/* Форма */}
      <Box id="contact" py={24} px={4}>
        <Container maxW="4xl">
          <ScrollReveal>
            <Card.Root bg="brand.950" color="white" borderRadius="2xl" overflow="hidden">
              <CardBody p={{ base: 8, md: 12 }}>
                <VStack gap={6} textAlign="center">
                  <Heading fontSize={{ base: '2xl', md: '3xl' }}>Готовы обсудить ваш проект?</Heading>
                  <Text color="gray.300" maxW="xl">Бесплатная консультация. Расскажем стоимость и сроки.</Text>
                  <Box w="full" pt={2}>
                    <LeadForm />
                  </Box>
                </VStack>
              </CardBody>
            </Card.Root>
          </ScrollReveal>
        </Container>
      </Box>
    </>
  )
}
