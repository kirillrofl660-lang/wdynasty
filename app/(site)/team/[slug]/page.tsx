export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Box, Container, Heading, Text, VStack, HStack, Flex, SimpleGrid } from '@chakra-ui/react'

function plural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}

const craftLabel: Record<string, string> = {
  dev: 'Разработка',
  design: 'Дизайн',
  devops: 'DevOps',
  management: 'Управление',
  analytics: 'Аналитика',
  qa: 'QA',
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'users',
    where: { slug: { equals: slug }, isPublic: { equals: true } },
    limit: 1,
    depth: 1,
  })
  const m = result.docs[0] as any
  if (!m) return { title: 'Мастер не найден' }

  return {
    title: `${m.name} — ${m.position ?? 'Мастер'} | Династия Разработчиков`,
    description: m.bio ?? `Профиль специалиста ${m.name} из студии Династия Разработчиков.`,
    openGraph: {
      title: `${m.name} · Династия`,
      description: m.bio ?? '',
      images: m.avatar?.url ? [{ url: m.avatar.url }] : [],
    },
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'users',
      where: { isPublic: { equals: true }, slug: { exists: true } },
      limit: 100,
      depth: 0,
    })
    return result.docs
      .filter((u: any) => u.slug)
      .map((u: any) => ({ slug: u.slug }))
  } catch {
    return []
  }
}

export default async function MemberPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'users',
    where: { slug: { equals: slug }, isPublic: { equals: true } },
    limit: 1,
    depth: 1,
  })

  const m = result.docs[0] as any
  if (!m) notFound()

  const skills: string[] = (m.skills ?? []).map((s: any) => s.skill).filter(Boolean)

  return (
    <Box bg="#f5f0e6" minH="100vh">

      {/* ── Breadcrumb ─────────────────────────── */}
      <Box py={4} px={4} style={{ borderBottom: '1px solid rgba(139,28,44,0.1)' }}>
        <Container maxW="6xl">
          <HStack gap={2} fontSize="sm" color="#7a6050">
            <Link href="/" style={{ color: '#7a6050', textDecoration: 'none' }}>Главная</Link>
            <Text>◆</Text>
            <Link href="/team" style={{ color: '#7a6050', textDecoration: 'none' }}>Мастера</Link>
            <Text>◆</Text>
            <Text color="#8b1c2c" fontWeight="600">{m.name}</Text>
          </HStack>
        </Container>
      </Box>

      {/* ── Profile header ─────────────────────── */}
      <Container maxW="6xl" px={{ base: 4, md: 8 }} py={{ base: 12, md: 20 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 8, md: 14 }}
          align={{ base: 'center', md: 'start' }}
        >
          {/* Avatar */}
          <Box flexShrink={0}>
            <Box
              w={{ base: '200px', md: '260px' }}
              h={{ base: '200px', md: '260px' }}
              style={{ position: 'relative' }}
            >
              {/* Decorative diamond frame */}
              <Box
                position="absolute"
                inset="-8px"
                style={{ border: '1.5px solid rgba(139,28,44,0.3)', transform: 'rotate(3deg)', borderRadius: '4px', zIndex: 0 }}
              />
              <Box
                position="absolute"
                inset="-4px"
                style={{ border: '1.5px solid rgba(184,133,42,0.4)', transform: 'rotate(-2deg)', borderRadius: '3px', zIndex: 0 }}
              />
              <Box
                overflow="hidden"
                style={{ borderRadius: '4px', position: 'relative', zIndex: 1, width: '100%', height: '100%' }}
              >
                {m.avatar?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.avatar.url}
                    alt={m.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <Flex
                    w="full" h="full" align="center" justify="center"
                    style={{ background: 'linear-gradient(160deg, #8b1c2c 0%, #6e1420 100%)' }}
                  >
                    <Text
                      style={{ fontFamily: 'var(--font-yeseva, "Yeseva One", serif)', fontSize: '6rem', color: 'rgba(245,240,230,0.25)', lineHeight: 1, userSelect: 'none' }}
                    >
                      {m.name.charAt(0)}
                    </Text>
                  </Flex>
                )}
              </Box>
            </Box>

            {/* Stats under avatar */}
            {(m.yearsExperience || m.projectsDone) && (
              <HStack gap={5} mt={6} justify="center">
                {m.yearsExperience && (
                  <VStack gap={0} textAlign="center">
                    <Text style={{ fontFamily: 'var(--font-philosopher, serif)' }} fontSize="2xl" fontWeight="700" color="#8b1c2c" lineHeight={1}>{m.yearsExperience}</Text>
                    <Text fontSize="xs" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color="#7a6050">{plural(m.yearsExperience, 'год опыта', 'года опыта', 'лет опыта')}</Text>
                  </VStack>
                )}
                {m.yearsExperience && m.projectsDone && (
                  <Box w="1px" h="32px" bg="rgba(139,28,44,0.2)" />
                )}
                {m.projectsDone && (
                  <VStack gap={0} textAlign="center">
                    <Text style={{ fontFamily: 'var(--font-philosopher, serif)' }} fontSize="2xl" fontWeight="700" color="#8b1c2c" lineHeight={1}>{m.projectsDone}</Text>
                    <Text fontSize="xs" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color="#7a6050">{plural(m.projectsDone, 'проект', 'проекта', 'проектов')}</Text>
                  </VStack>
                )}
              </HStack>
            )}
          </Box>

          {/* Info */}
          <VStack align="start" gap={5} flex={1}>
            {m.craft && (
              <Text fontSize="xs" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="#8b1c2c">
                ◆ {craftLabel[m.craft] ?? m.craft}
              </Text>
            )}

            <Box>
              <Heading
                as="h1"
                style={{ fontFamily: 'var(--font-philosopher, "Philosopher", serif)' }}
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="700"
                color="#1a0f0a"
                lineHeight="1.1"
                mb={1}
              >
                {m.name}
              </Heading>
              {m.position && (
                <Text fontSize={{ base: 'lg', md: 'xl' }} color="#8b1c2c" fontWeight="600">{m.position}</Text>
              )}
            </Box>

            {/* Ornament */}
            <HStack gap={3} w="full" maxW="320px">
              <Box flex={1} h="1.5px" style={{ background: 'linear-gradient(90deg, #8b1c2c, transparent)' }} />
              <svg width="24" height="14" viewBox="0 0 28 16">
                <ellipse cx="14" cy="8" rx="4" ry="6" fill="#8b1c2c" opacity=".7"/>
                <ellipse cx="14" cy="8" rx="6" ry="4" fill="#8b1c2c" opacity=".7"/>
                <circle cx="14" cy="8" r="2.5" fill="#b8852a"/>
              </svg>
              <Box flex={1} h="1.5px" style={{ background: 'linear-gradient(90deg, transparent, #8b1c2c)' }} />
            </HStack>

            {m.bio && (
              <Text fontSize={{ base: 'md', md: 'lg' }} color="#3a271e" lineHeight="1.8" maxW="620px">
                {m.bio}
              </Text>
            )}

            {/* Quote */}
            {m.quote && (
              <Box
                style={{ borderLeft: '3px solid #8b1c2c', paddingLeft: '20px', background: 'rgba(139,28,44,0.04)', borderRadius: '0 4px 4px 0' }}
                py={4} px={5}
              >
                <Text
                  style={{ fontFamily: 'var(--font-philosopher, serif)' }}
                  fontStyle="italic"
                  fontSize="lg"
                  color="#1a0f0a"
                >
                  «{m.quote}»
                </Text>
              </Box>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <VStack align="start" gap={3} w="full">
                <Text fontSize="xs" fontWeight="700" letterSpacing="0.15em" textTransform="uppercase" color="#7a6050">Стек и навыки</Text>
                <HStack gap={2} wrap="wrap">
                  {skills.map((sk, i) => (
                    <Text
                      key={i}
                      fontSize="xs" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase"
                      color="#8b1c2c"
                      style={{ border: '1.5px solid rgba(139,28,44,0.3)', padding: '5px 12px', borderRadius: '2px', background: 'rgba(139,28,44,0.03)' }}
                    >
                      {sk}
                    </Text>
                  ))}
                </HStack>
              </VStack>
            )}

            {/* Contacts */}
            {(m.telegram || m.github) && (
              <HStack gap={4} pt={2}>
                {m.telegram && (
                  <a
                    href={`https://t.me/${m.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', border: '1.5px solid rgba(139,28,44,0.3)', padding: '8px 16px', borderRadius: '2px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#8b1c2c' }}
                  >
                    Telegram
                  </a>
                )}
                {m.github && (
                  <a
                    href={`https://github.com/${m.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', border: '1.5px solid rgba(139,28,44,0.3)', padding: '8px 16px', borderRadius: '2px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#8b1c2c' }}
                  >
                    GitHub
                  </a>
                )}
              </HStack>
            )}
          </VStack>
        </Flex>
      </Container>

      {/* ── CTA strip ──────────────────────────── */}
      <Box bg="#8b1c2c" py={14} px={4}>
        <Container maxW="4xl" textAlign="center">
          <Text
            style={{ fontFamily: 'var(--font-philosopher, serif)' }}
            fontStyle="italic"
            fontSize={{ base: 'xl', md: '2xl' }}
            color="#f5f0e6"
            mb={6}
          >
            Хотите, чтобы {m.name.split(' ')[0]} работал над вашим проектом?
          </Text>
          <a
            href="/#cta"
            style={{ display: 'inline-block', background: '#f5f0e6', color: '#8b1c2c', padding: '14px 36px', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', textDecoration: 'none' }}
          >
            Обсудить задачу
          </a>
        </Container>
      </Box>

      {/* ── Back link ──────────────────────────── */}
      <Container maxW="6xl" px={{ base: 4, md: 8 }} py={8}>
        <Link href="/team" style={{ textDecoration: 'none' }}>
          <Text fontSize="sm" fontWeight="700" color="#7a6050" _hover={{ color: '#8b1c2c' }}>
            ← Все мастера
          </Text>
        </Link>
      </Container>

    </Box>
  )
}
