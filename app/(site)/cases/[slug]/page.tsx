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
  bg: '#fafafa',
  surface: '#ffffff',
  ink: '#111111',
  muted: '#555555',
  muted2: '#666666',
  purple: '#8b5cf6',
  pink: '#ec4899',
  orange: '#f97316',
  darkPurple: '#1a1030',
  darkPurple2: '#2a1a3a',
  white: '#ffffff',
}

const GRAD = `linear-gradient(90deg, ${C.purple}, ${C.pink})`
const gradText = {
  background: GRAD,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const

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
    <Box className="wd-root" bg={C.bg} minH="100vh" pb={20}>
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
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              style={{ background: `linear-gradient(135deg, rgba(26,16,48,.92) 0%, rgba(42,26,58,.86) 60%, rgba(26,16,48,.78) 100%)` }}
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
            style={{ background: `linear-gradient(135deg, ${C.darkPurple}, ${C.darkPurple2})` }}
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
          <Link href="/cases" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>
            <ArrowLeft size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
            Все кейсы
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
          {c.services?.length > 0 && (
            <HStack gap={3} wrap="wrap" mt={5}>
              {c.services.map((s: any) => (
                <Link
                  key={s.id}
                  href={`/uslugi/${s.slug}`}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,.10)',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '14px',
                    border: '1px solid rgba(255,255,255,.15)',
                  }}
                >
                  {s.title}
                </Link>
              ))}
            </HStack>
          )}
        </Container>
      </Box>

      <Container maxW="4xl" px={{ base: 4, md: 8 }} pt={{ base: 10, md: 14 }}>
        <VStack gap={10} align="stretch">

          {/* Context: what is it in modern reality */}
          {c.context && (
            <Box>
              <SectionHeading icon={<Lightbulb size={22} />} title="Что это такое в современной реальности" />
              <Box
                bg={C.surface}
                borderRadius="24px"
                p={{ base: 6, md: 8 }}
                style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}
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
                bg={C.surface}
                borderRadius="24px"
                p={{ base: 6, md: 8 }}
                style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}
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
                bg={C.surface}
                borderRadius="24px"
                p={{ base: 6, md: 8 }}
                style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}
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
                  bg={C.surface}
                  borderRadius="24px"
                  p={{ base: 6, md: 8 }}
                  h="full"
                  style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}
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
                  bg={C.surface}
                  borderRadius="24px"
                  p={{ base: 6, md: 8 }}
                  h="full"
                  style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}
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
              bg={C.surface}
              borderRadius="24px"
              p={{ base: 5, md: 7 }}
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <VStack gap={5} align="start">
                <HStack gap={3} align="baseline" wrap="wrap">
                  <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="700" style={gradText}>
                    {c.basePrice ?? 'Цена по запросу'}
                  </Heading>
                  <Text fontSize="sm" color={C.muted2} fontWeight={500}>
                    базовая стоимость
                  </Text>
                </HStack>
                {c.priceNote && (
                  <Text color={C.muted} lineHeight="1.7">
                    {c.priceNote}
                  </Text>
                )}
                {factors.length > 0 && (
                  <Box w="full">
                    <Text fontSize="sm" fontWeight={600} color={C.ink} mb={3}>
                      Что может повлиять на цену:
                    </Text>
                    <VStack gap={3} align="stretch">
                      {factors.map((f, i) => (
                        <HStack key={i} gap={3} align="start" p={3} borderRadius="12px" bg="rgba(0,0,0,0.02)">
                          <Box flexShrink={0} px={2} py={1} borderRadius="6px" style={{ background: 'rgba(139,92,246,.10)', color: C.purple }} fontSize="xs" fontWeight={700}>
                            {f.impact ?? 'фактор'}
                          </Box>
                          <Box>
                            <Text fontWeight="600" color={C.ink} fontSize="sm">{f.title}</Text>
                            {f.description && (
                              <Text color={C.muted} fontSize="sm" lineHeight="1.6">{f.description}</Text>
                            )}
                          </Box>
                        </HStack>
                      ))}
                    </VStack>
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
            mt={6}
            borderRadius="28px"
            p={{ base: 6, md: 10 }}
            style={{ background: `linear-gradient(135deg, ${C.darkPurple}, ${C.darkPurple2})`, boxShadow: '0 30px 80px rgba(139,92,246,.25)' }}
          >
            <VStack gap={6} textAlign="center" maxW="520px" mx="auto">
              <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="700" color="white">
                Нужно такое же решение?
              </Heading>
              <Text color="rgba(255,255,255,0.75)" lineHeight="1.7">
                Оставьте заявку — мы перезвоним, уточним детали и рассчитаем стоимость под ваш проект.
              </Text>
              <Box w="full">
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
      <Box style={{ color: C.purple }}>{icon}</Box>
      <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="700" color={C.ink}>
        {title}
      </Heading>
    </HStack>
  )
}
