export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import {
  Box, Container, Heading, Text, VStack, HStack, SimpleGrid, Badge,
} from '@chakra-ui/react'
import { LexicalRenderer } from '@/app/components/LexicalRenderer'
import { FaqAccordion } from '@/app/components/FaqAccordion'
import { LeadForm } from '@/src/widgets/lead/ui/LeadForm'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'cases',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })
  const c = result.docs[0] as any
  if (!c) return {}

  return {
    title: c.metaTitle || `${c.title} | Кейсы WebDynasty`,
    description: c.metaDescription || c.excerpt || '',
    alternates: { canonical: `https://wdynasty.ru/cases/${slug}` },
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'cases',
      where: { status: { equals: 'published' } },
      limit: 100,
    })
    return result.docs.map((c: any) => ({ slug: c.slug }))
  } catch {
    return []
  }
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'cases',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  })
  const c = result.docs[0] as any
  if (!c) notFound()

  const faq = (c.faq ?? []) as { question: string; answer: any }[]
  const factors = (c.priceFactors ?? []) as { title: string; description?: string; impact?: string }[]
  const coverUrl = c.coverImage?.url ?? c.coverImage?.sizes?.medium?.url ?? c.coverImage?.sizes?.small?.url

  return (
    <Box className="wd-root" bg="#fafafa" minH="100vh" pb={16}>
      {/* Hero with background cover */}
      <Box
        position="relative"
        color="white"
        pt={{ base: 24, md: 32 }}
        pb={{ base: 16, md: 24 }}
        px={{ base: 4, md: 8 }}
        overflow="hidden"
      >
        {coverUrl && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={0}
          >
            <Image
              src={coverUrl}
              alt={c.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            {/* Dark overlay for text readability */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              style={{ background: 'linear-gradient(135deg, rgba(26,16,48,.88) 0%, rgba(42,26,58,.82) 60%, rgba(26,16,48,.75) 100%)' }}
            />
          </Box>
        )}
        {!coverUrl && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={0}
            style={{ background: 'linear-gradient(135deg, #1a1030, #2a1a3a)' }}
          />
        )}

        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={0}
          style={{ background: 'radial-gradient(circle at 20% 80%, rgba(139,92,246,.20), transparent 40%)', pointerEvents: 'none' }}
        />

        <Container maxW="4xl" position="relative" zIndex={1}>
          <Link href="/cases" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', textDecoration: 'none' }}>
            ← Все кейсы
          </Link>
          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
            fontWeight="700"
            lineHeight="1.2"
            mt={3}
            mb={3}
            maxW="900px"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,.25)' }}
          >
            {c.title}
          </Heading>
          {c.searchQuery && (
            <Text fontSize="md" color="rgba(255,255,255,0.85)" fontStyle="italic" mb={3}>
              Вопрос клиента: «{c.searchQuery}»
            </Text>
          )}
          {c.excerpt && (
            <Text fontSize={{ base: 'md', md: 'lg' }} color="rgba(255,255,255,0.9)" lineHeight="1.7" maxW="720px">
              {c.excerpt}
            </Text>
          )}
        </Container>
      </Box>

      <Container maxW="4xl" px={{ base: 4, md: 8 }} pt={{ base: 10, md: 14 }}>
        <VStack gap={10} align="stretch">

          {/* Price block */}
          <Box
            bg="white"
            borderRadius="24px"
            p={{ base: 5, md: 7 }}
            style={{ border: '1px solid rgba(0,0,0,0.06)' }}
          >
            <VStack gap={5} align="start">
              <Badge px={3} py={1} borderRadius="999px" style={{ background: 'rgba(139,92,246,.08)', color: '#8b5cf6' }}>
                Стоимость
              </Badge>
              <HStack gap={3} align="baseline" wrap="wrap">
                <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="700" color="#111">
                  {c.basePrice ?? 'Цена по запросу'}
                </Heading>
                {c.service?.title && (
                  <Text fontSize="sm" color="#777">{c.service.title}</Text>
                )}
              </HStack>
              {c.priceNote && (
                <Text color="#555" lineHeight="1.7">
                  {c.priceNote}
                </Text>
              )}
              {factors.length > 0 && (
                <Box w="full">
                  <Text fontSize="sm" fontWeight="600" color="#111" mb={3}>
                    Что может повлиять на цену:
                  </Text>
                  <VStack gap={3} align="stretch">
                    {factors.map((f, i) => (
                      <HStack key={i} gap={3} align="start" p={3} borderRadius="12px" bg="rgba(0,0,0,0.02)">
                        <Box flexShrink={0} px={2} py={1} borderRadius="6px" bg="rgba(139,92,246,.08)" color="#8b5cf6" fontSize="xs" fontWeight="700">
                          {f.impact ?? 'фактор'}
                        </Box>
                        <Box>
                          <Text fontWeight="600" color="#111" fontSize="sm">{f.title}</Text>
                          {f.description && (
                            <Text color="#555" fontSize="sm" lineHeight="1.6">{f.description}</Text>
                          )}
                        </Box>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </Box>

          {/* Story */}
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {c.problem && (
              <Box bg="white" borderRadius="20px" p={6} style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                <Heading as="h2" fontSize="lg" fontWeight="600" color="#111" mb={3}>
                  Проблема
                </Heading>
                <Text color="#555" lineHeight="1.7">{c.problem}</Text>
              </Box>
            )}
            {c.result && (
              <Box bg="white" borderRadius="20px" p={6} style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                <Heading as="h2" fontSize="lg" fontWeight="600" color="#111" mb={3}>
                  Результат
                </Heading>
                <Box className="prose" color="#555" lineHeight="1.7">
                  <LexicalRenderer data={c.result} />
                </Box>
              </Box>
            )}
          </SimpleGrid>

          {c.solution && (
            <Box bg="white" borderRadius="20px" p={6} style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <Heading as="h2" fontSize="lg" fontWeight="600" color="#111" mb={3}>
                Решение
              </Heading>
              <Box className="prose" color="#555" lineHeight="1.7">
                <LexicalRenderer data={c.solution} />
              </Box>
            </Box>
          )}

          {/* FAQ */}
          {faq.length > 0 && (
            <Box>
              <Heading as="h2" fontSize="xl" fontWeight="600" color="#111" mb={5}>
                Частые вопросы по этому кейсу
              </Heading>
              <FaqAccordion
                items={faq.map((item) => ({
                  question: item.question,
                  answer: (
                    <Box className="prose">
                      <LexicalRenderer data={item.answer} />
                    </Box>
                  ),
                }))}
              />
            </Box>
          )}

          {/* CTA form */}
          <Box
            mt={6}
            borderRadius="28px"
            p={{ base: 6, md: 10 }}
            style={{ background: 'linear-gradient(135deg, #1a1030, #2a1a3a)' }}
            boxShadow="0 30px 80px rgba(139,92,246,.25)"
          >
            <VStack gap={6} textAlign="center">
              <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="700" color="white">
                Нужно такое же решение?
              </Heading>
              <Text color="rgba(255,255,255,0.75)" maxW="520px">
                Оставьте заявку — мы перезвоним, уточним детали и рассчитаем стоимость под ваш проект.
              </Text>
              <LeadForm />
            </VStack>
          </Box>

        </VStack>
      </Container>
    </Box>
  )
}
