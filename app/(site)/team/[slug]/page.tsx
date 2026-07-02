export const revalidate = 300

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Box } from '@chakra-ui/react/box'
import { Container } from '@chakra-ui/react/container'
import { Heading } from '@chakra-ui/react/heading'
import { Text } from '@chakra-ui/react/text'
import { VStack, HStack } from '@chakra-ui/react/stack'
import { Flex } from '@chakra-ui/react/flex'

const C = { bg: '#fafafa', ink: '#111', muted: '#595959', muted2: '#595959', p: '#6b21d4', pink: '#be1860' }
const GRAD = `linear-gradient(90deg, ${C.p}, ${C.pink})`
const gradText = { color: '#6b21d4', background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' } as const

function plural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}

const craftLabel: Record<string, string> = {
  dev: 'Разработка', design: 'Дизайн', devops: 'DevOps', management: 'Управление', analytics: 'Аналитика', qa: 'QA',
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
  if (!m) return { title: 'Специалист не найден' }

  return {
    title: `${m.name} — ${m.position ?? 'Специалист'} | WebDynasty`,
    description: m.bio ?? `Профиль специалиста ${m.name} из студии WebDynasty.`,
    openGraph: {
      title: `${m.name} · WebDynasty`,
      description: m.bio ?? '',
      images: m.avatar?.url ? [{ url: m.avatar.url }] : [],
    },
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
    <Box bg={C.bg} minH="100vh" style={{ fontFamily: 'var(--font-manrope, Manrope, sans-serif)' }}>

      {/* ── Breadcrumb ── */}
      <Box py={4} px={4} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Container maxW="6xl">
          <HStack gap={2} fontSize="sm" color={C.muted}>
            <Link href="/" style={{ color: C.muted, textDecoration: 'none' }}>Главная</Link>
            <Text color="#ccc">/</Text>
            <Link href="/team" style={{ color: C.muted, textDecoration: 'none' }}>Команда</Link>
            <Text color="#ccc">/</Text>
            <Text color={C.p} fontWeight="700">{m.name}</Text>
          </HStack>
        </Container>
      </Box>

      {/* ── Profile header ── */}
      <Container maxW="6xl" px={{ base: 4, md: 8 }} py={{ base: 12, md: 20 }}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 8, md: 14 }} align={{ base: 'center', md: 'start' }}>
          {/* Avatar */}
          <Box flexShrink={0}>
            <Box w={{ base: '200px', md: '260px' }} h={{ base: '200px', md: '260px' }} style={{ position: 'relative' }}>
              {/* Градиентная рамка */}
              <Box position="absolute" inset="-6px" style={{ background: GRAD, borderRadius: '26px', zIndex: 0, opacity: 0.5 }} />
              <Box overflow="hidden" style={{ borderRadius: '22px', position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
                {m.avatar?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.avatar.url} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <Flex w="full" h="full" align="center" justify="center" style={{ background: GRAD }}>
                    <Text fontSize="6rem" fontWeight="900" color="rgba(255,255,255,0.85)" lineHeight={1} userSelect="none">
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
                    <Text fontSize="2xl" fontWeight="900" style={gradText} lineHeight={1}>{m.yearsExperience}</Text>
                    <Text fontSize="xs" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color={C.muted2}>{plural(m.yearsExperience, 'год опыта', 'года опыта', 'лет опыта')}</Text>
                  </VStack>
                )}
                {m.yearsExperience && m.projectsDone && (<Box w="1px" h="32px" bg="rgba(0,0,0,0.12)" />)}
                {m.projectsDone && (
                  <VStack gap={0} textAlign="center">
                    <Text fontSize="2xl" fontWeight="900" style={gradText} lineHeight={1}>{m.projectsDone}</Text>
                    <Text fontSize="xs" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color={C.muted2}>{plural(m.projectsDone, 'проект', 'проекта', 'проектов')}</Text>
                  </VStack>
                )}
              </HStack>
            )}
          </Box>

          {/* Info */}
          <VStack align="start" gap={5} flex={1}>
            {m.craft && (
              <Text fontSize="13px" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color={C.p}>
                {craftLabel[m.craft] ?? m.craft}
              </Text>
            )}

            <Box>
              <Heading as="h1" fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight="800" letterSpacing="-0.02em" color={C.ink} lineHeight="1.1" mb={1}>
                {m.name}
              </Heading>
              {m.position && (<Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="700" style={gradText}>{m.position}</Text>)}
            </Box>

            {/* Ornament */}
            <HStack gap={3} w="full" maxW="320px">
              <Box flex={1} h="1.5px" style={{ background: `linear-gradient(90deg, ${C.p}, transparent)` }} />
              <Box w="9px" h="9px" flexShrink={0} style={{ background: GRAD, transform: 'rotate(45deg)', borderRadius: '2px' }} />
              <Box flex={1} h="1.5px" style={{ background: `linear-gradient(90deg, transparent, ${C.pink})` }} />
            </HStack>

            {m.bio && (
              <Text fontSize={{ base: 'md', md: 'lg' }} color="#444" lineHeight="1.8" maxW="620px">{m.bio}</Text>
            )}

            {/* Quote */}
            {m.quote && (
              <Box style={{ borderLeft: `3px solid ${C.p}`, paddingLeft: '20px', background: 'rgba(139,92,246,0.05)', borderRadius: '0 8px 8px 0' }} py={4} px={5}>
                <Text fontStyle="italic" fontSize="lg" color={C.ink}>«{m.quote}»</Text>
              </Box>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <VStack align="start" gap={3} w="full">
                <Text fontSize="xs" fontWeight="700" letterSpacing="0.15em" textTransform="uppercase" color={C.muted2}>Стек и навыки</Text>
                <HStack gap={2} wrap="wrap">
                  {skills.map((sk, i) => (
                    <Text key={i} fontSize="xs" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" color={C.p}
                      style={{ border: '1px solid rgba(139,92,246,0.3)', padding: '5px 14px', borderRadius: '999px', background: 'rgba(139,92,246,0.06)' }}>
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
                  <a href={`https://t.me/${m.telegram}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', border: '1px solid rgba(139,92,246,0.4)', padding: '9px 18px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: C.p }}>
                    Telegram
                  </a>
                )}
                {m.github && (
                  <a href={`https://github.com/${m.github}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', border: '1px solid rgba(139,92,246,0.4)', padding: '9px 18px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: C.p }}>
                    GitHub
                  </a>
                )}
              </HStack>
            )}
          </VStack>
        </Flex>
      </Container>

      {/* ── CTA strip (градиент) ── */}
      <Box py={16} px={4} style={{ background: GRAD }}>
        <Container maxW="4xl" textAlign="center">
          <Heading as="p" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="800" color="white" mb={6} lineHeight="1.3">
            Хотите, чтобы {m.name.split(' ')[0]} работал над вашим проектом?
          </Heading>
          <a href="/#cta"
            style={{ display: 'inline-block', background: 'white', color: C.p, padding: '15px 38px', fontWeight: 700, fontSize: '0.9rem', borderRadius: '999px', textDecoration: 'none' }}>
            Обсудить задачу
          </a>
        </Container>
      </Box>

      {/* ── Back link ── */}
      <Container maxW="6xl" px={{ base: 4, md: 8 }} py={8}>
        <Link href="/team" style={{ textDecoration: 'none' }}>
          <Text fontSize="sm" fontWeight="700" color={C.muted} _hover={{ color: C.p }}>← Вся команда</Text>
        </Link>
      </Container>

    </Box>
  )
}
