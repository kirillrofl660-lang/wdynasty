export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import {
  Box, Container, Heading, Text, VStack, HStack, SimpleGrid, Badge, Flex,
} from '@chakra-ui/react'
import {
  Lightbulb, Target, Wrench, Sparkles, CheckCircle2, ArrowLeft, TrendingUp,
} from 'lucide-react'
import { LexicalRenderer } from '@/app/components/LexicalRenderer'
import { FaqAccordion } from '@/app/components/FaqAccordion'
import { LeadForm } from '@/src/widgets/lead/ui/LeadForm'

const C = {
  cream: '#f5f0e6',
  creamDark: '#ede7d6',
  crimson: '#8b1c2c',
  crimsonDark: '#6e1420',
  gold: '#b8852a',
  ink: '#1a0f0a',
  muted: '#7a6050',
  white: '#ffffff',
}

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
    <Box className="wd-root" bg={C.cream} minH="100vh" pb={20}>
      {/* Decorative top bar */}
      <Box h="6px" w="full" bg={`linear-gradient(90deg, ${C.crimson}, ${C.gold})`} />

      {/* Hero */}
      <Box pt={{ base: 14, md: 20 }} pb={{ base: 10, md: 14 }} px={{ base: 4, md: 8 }}>
        <Container maxW="6xl">
          <Link
            href="/cases"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: C.muted,
              fontSize: '14px',
              textDecoration: 'none',
              fontWeight: 500,
              marginBottom: '24px',
            }}
          >
            <ArrowLeft size={16} />
            Все кейсы
          </Link>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 12 }} alignItems="center">
            <VStack gap={5} align="start">
              {c.searchQuery && (
                <Badge
                  px={4}
                  py={1.5}
                  borderRadius="999px"
                  fontSize="13px"
                  fontWeight={500}
                  style={{ background: 'rgba(139,28,44,0.08)', color: C.crimson, border: `1px solid rgba(139,28,44,0.14)` }}
                >
                  Вопрос клиента: «{c.searchQuery}»
                </Badge>
              )}
              <Heading
                as="h1"
                fontSize={{ base: '32px', md: '44px', lg: '52px' }}
                fontWeight="700"
                lineHeight="1.15"
                color={C.ink}
                style={{ fontFamily: 'var(--font-philosopher, "Philosopher", serif)' }}
              >
                {c.title}
              </Heading>
              {c.excerpt && (
                <Text fontSize={{ base: 'md', md: 'lg' }} color={C.muted} lineHeight="1.7" maxW="600px">
                  {c.excerpt}
                </Text>
              )}
              {c.services?.length > 0 && (
                <HStack gap={2} wrap="wrap">
                  {c.services.map((s: any) => (
                    <Link
                      key={s.id}
                      href={`/uslugi/${s.slug}`}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '999px',
                        background: C.white,
                        color: C.crimson,
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '13px',
                        border: `1px solid rgba(139,28,44,0.14)`,
                      }}
                    >
                      {s.title}
                    </Link>
                  ))}
                </HStack>
              )}
            </VStack>

            {coverUrl && (
              <Box
                borderRadius="24px"
                overflow="hidden"
                style={{ boxShadow: '0 30px 80px rgba(26,15,10,0.12)', border: `8px solid ${C.white}` }}
              >
                <Image
                  src={coverUrl}
                  alt={c.title}
                  width={1200}
                  height={630}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
                  priority
                />
              </Box>
            )}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Main content */}
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <VStack gap={{ base: 12, md: 16 }} align="stretch">

          {/* Context: what is it in modern reality */}
          {c.context && (
            <Box>
              <SectionHeading icon={<Lightbulb size={22} />} title="Что это такое в современной реальности" />
              <Box
                bg={C.white}
                borderRadius="24px"
                p={{ base: 6, md: 8 }}
                style={{ border: `1px solid rgba(139,28,44,0.08)`, boxShadow: '0 10px 40px rgba(26,15,10,0.04)' }}
              >
                <Box className="prose" color={C.muted} lineHeight="1.8" fontSize={{ base: 'md', md: 'lg' }}>
                  <LexicalRenderer data={c.context} />
                </Box>
              </Box>
            </Box>
          )}

          {/* Problem */}
          {c.problem && (
            <Box>
              <SectionHeading icon={<Target size={22} />} title="Проблема клиента" />
              <Box
                bg={C.white}
                borderRadius="24px"
                p={{ base: 6, md: 8 }}
                style={{ border: `1px solid rgba(139,28,44,0.08)`, boxShadow: '0 10px 40px rgba(26,15,10,0.04)' }}
              >
                <Text color={C.muted} lineHeight="1.8" fontSize={{ base: 'md', md: 'lg' }}>
                  {c.problem}
                </Text>
              </Box>
            </Box>
          )}

          {/* Problem solving: how to properly solve */}
          {c.problemSolving && (
            <Box>
              <SectionHeading icon={<Wrench size={22} />} title="Как правильно решать эти проблемы" />
              <Box
                bg={C.white}
                borderRadius="24px"
                p={{ base: 6, md: 8 }}
                style={{ border: `1px solid rgba(139,28,44,0.08)`, boxShadow: '0 10px 40px rgba(26,15,10,0.04)' }}
              >
                <Box className="prose" color={C.muted} lineHeight="1.8" fontSize={{ base: 'md', md: 'lg' }}>
                  <LexicalRenderer data={c.problemSolving} />
                </Box>
              </Box>
            </Box>
          )}

          {/* Solution + Result */}
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {c.solution && (
              <Box>
                <SectionHeading icon={<Sparkles size={22} />} title="Решение" />
                <Box
                  bg={C.white}
                  borderRadius="24px"
                  p={{ base: 6, md: 8 }}
                  h="full"
                  style={{ border: `1px solid rgba(139,28,44,0.08)`, boxShadow: '0 10px 40px rgba(26,15,10,0.04)' }}
                >
                  <Box className="prose" color={C.muted} lineHeight="1.8">
                    <LexicalRenderer data={c.solution} />
                  </Box>
                </Box>
              </Box>
            )}
            {c.result && (
              <Box>
                <SectionHeading icon={<TrendingUp size={22} />} title="Результат" />
                <Box
                  bg={C.white}
                  borderRadius="24px"
                  p={{ base: 6, md: 8 }}
                  h="full"
                  style={{ border: `1px solid rgba(139,28,44,0.08)`, boxShadow: '0 10px 40px rgba(26,15,10,0.04)' }}
                >
                  <Box className="prose" color={C.muted} lineHeight="1.8">
                    <LexicalRenderer data={c.result} />
                  </Box>
                </Box>
              </Box>
            )}
          </SimpleGrid>

          {/* Price block */}
          <Box>
            <SectionHeading icon={<CheckCircle2 size={22} />} title="Стоимость и факторы" />
            <Box
              bg={C.white}
              borderRadius="24px"
              p={{ base: 6, md: 8 }}
              style={{ border: `1px solid rgba(139,28,44,0.08)`, boxShadow: '0 10px 40px rgba(26,15,10,0.04)' }}
            >
              <VStack gap={6} align="start">
                <HStack gap={3} align="baseline" wrap="wrap">
                  <Heading as="h2" fontSize={{ base: '28px', md: '36px' }} fontWeight="700" color={C.crimson} style={{ fontFamily: 'var(--font-philosopher, "Philosopher", serif)' }}>
                    {c.basePrice ?? 'Цена по запросу'}
                  </Heading>
                  <Text fontSize="sm" color={C.muted} fontWeight={500}>
                    базовая стоимость
                  </Text>
                </HStack>
                {c.priceNote && (
                  <Text color={C.muted} lineHeight="1.7" fontSize={{ base: 'md', md: 'lg' }}>
                    {c.priceNote}
                  </Text>
                )}
                {factors.length > 0 && (
                  <Box w="full">
                    <Text fontSize="sm" fontWeight={700} color={C.ink} mb={4} textTransform="uppercase" letterSpacing="0.05em">
                      Что влияет на цену
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                      {factors.map((f, i) => (
                        <Flex
                          key={i}
                          gap={4}
                          align="start"
                          p={4}
                          borderRadius="16px"
                          bg={C.cream}
                          style={{ border: `1px solid rgba(139,28,44,0.06)` }}
                        >
                          <Box
                            flexShrink={0}
                            px={3}
                            py={1}
                            borderRadius="8px"
                            bg={C.crimson}
                            color={C.white}
                            fontSize="12px"
                            fontWeight={700}
                          >
                            {f.impact ?? 'фактор'}
                          </Box>
                          <Box>
                            <Text fontWeight={600} color={C.ink} fontSize="sm" mb={1}>{f.title}</Text>
                            {f.description && (
                              <Text color={C.muted} fontSize="sm" lineHeight="1.6">{f.description}</Text>
                            )}
                          </Box>
                        </Flex>
                      ))}
                    </SimpleGrid>
                  </Box>
                )}
              </VStack>
            </Box>
          </Box>

          {/* FAQ */}
          {faq.length > 0 && (
            <Box>
              <SectionHeading icon={<CheckCircle2 size={22} />} title="Частые вопросы по кейсу" />
              <FaqAccordion
                items={faq.map((item) => ({
                  question: item.question,
                  answer: (
                    <Box className="prose" color={C.muted}>
                      <LexicalRenderer data={item.answer} />
                    </Box>
                  ),
                }))}
              />
            </Box>
          )}

          {/* CTA form */}
          <Box
            borderRadius="28px"
            p={{ base: 8, md: 12 }}
            style={{ background: `linear-gradient(135deg, ${C.crimson}, ${C.crimsonDark})`, boxShadow: '0 30px 80px rgba(139,28,44,0.25)' }}
          >
            <VStack gap={6} textAlign="center" maxW="640px" mx="auto">
              <Heading
                as="h2"
                fontSize={{ base: 'xl', md: '3xl' }}
                fontWeight="700"
                color={C.white}
                style={{ fontFamily: 'var(--font-philosopher, "Philosopher", serif)' }}
              >
                Нужен похожий результат?
              </Heading>
              <Text color="rgba(245,240,230,0.85)" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.7">
                Оставьте заявку — мы перезвоним, обсудим детали и рассчитаем стоимость под ваш проект.
              </Text>
              <Box w="full" pt={2}>
                <LeadForm />
              </Box>
            </VStack>
          </Box>

        </VStack>
      </Container>
    </Box>
  )
}

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <HStack gap={3} mb={4}>
      <Box color={C.crimson}>{icon}</Box>
      <Heading
        as="h2"
        fontSize={{ base: 'xl', md: '2xl' }}
        fontWeight="700"
        color={C.ink}
        style={{ fontFamily: 'var(--font-philosopher, "Philosopher", serif)' }}
      >
        {title}
      </Heading>
    </HStack>
  )
}
