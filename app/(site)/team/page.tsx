export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Flex, Grid, GridItem } from '@chakra-ui/react'

export const metadata: Metadata = {
  title: 'О компании | WebDynasty',
  description: 'WebDynasty — команда веб-разработки. Наша история, ценности и специалисты, которые создадут ваш продукт.',
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

// ── Палитра нового дизайна ───────────────────────────────────────────────────
const C = { bg: '#fafafa', alt: '#f3f3f6', ink: '#111', muted: '#666', muted2: '#777', p: '#8b5cf6', pink: '#ec4899' }
const GRAD = `linear-gradient(90deg, ${C.p}, ${C.pink})`
const GRAD3 = `linear-gradient(90deg, ${C.p}, ${C.pink}, #f97316)`
const gradText = { background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } as const

const craftLabel: Record<string, string> = {
  dev: 'Разработка', design: 'Дизайн', devops: 'DevOps', management: 'Управление', analytics: 'Аналитика', qa: 'QA',
}

const stats = [
  { value: '5+', label: 'Лет на рынке' },
  { value: '80+', label: 'Проектов сдано' },
  { value: '6', label: 'Специалистов в команде' },
  { value: '98%', label: 'Клиентов возвращается' },
]

const values = [
  { num: 'I',   title: 'Инженерный подход',      text: 'Каждый проект — продуманная архитектура под задачу, а не набор шаблонов. Решаем суть, а не симптомы.' },
  { num: 'II',  title: 'Честность в сроках',      text: 'Называем реальные даты. Если что-то идёт не так — сообщаем первыми, а не в день дедлайна.' },
  { num: 'III', title: 'Код как наследие',        text: 'Пишем так, чтобы следующий разработчик не ругался. Документация, тесты, читаемая структура — часть работы.' },
  { num: 'IV',  title: 'Глубина экспертизы',      text: 'Специализация, а не универсальность. Каждый специалист — эксперт в своём направлении.' },
  { num: 'V',   title: 'Долгие отношения',        text: 'Строим так, чтобы клиент вернулся через год с новой задачей. Поддержка, развитие, совместный рост.' },
  { num: 'VI',  title: 'Без магии — только система', text: 'Понятный процесс, измеримый результат. Только этапы, задачи и прозрачная ответственность.' },
]

// ── Декоративный разделитель (градиентная линия + ромб) ──────────────────────
function Ornament() {
  return (
    <HStack gap={3} aria-hidden w="260px" mx="auto">
      <Box flex={1} h="1.5px" style={{ background: `linear-gradient(90deg,transparent,${C.p})` }} />
      <Box w="10px" h="10px" flexShrink={0} style={{ background: GRAD, transform: 'rotate(45deg)', borderRadius: '2px' }} />
      <Box flex={1} h="1.5px" style={{ background: `linear-gradient(90deg,${C.pink},transparent)` }} />
    </HStack>
  )
}

const DEFAULT_TIMELINE = [
  { year: '2013', event: 'Первый проект. Два разработчика, один заказчик.' },
  { year: '2016', event: 'Специализация на 1С-Битрикс. Первый корпоративный клиент.' },
  { year: '2018', event: 'Перестройка процессов. Внедрение Agile-спринтов.' },
  { year: '2020', event: 'Выход на Laravel + React-разработку. Расширение до 15 человек.' },
  { year: '2022', event: 'Запуск DevOps-направления. Первые проекты с Kubernetes.' },
  { year: 'Сейчас', event: 'Полный цикл от дизайна до деплоя и поддержки.' },
]

const DEFAULT_PARAGRAPHS = [
  'Первый проект — сайт местного интернет-магазина в 2013 году. Тогда нас было двое, код писался в Notepad++ и деплоился по FTP. Зато в срок и без лишних вопросов.',
  'К 2017-му выросли до пяти человек и стали специализироваться на Битрикс-разработке. Научились горько: брали слишком много, сдавали с задержкой. Решили перестроить всё с нуля — процессы, найм, архитектуру.',
  'Сегодня WebDynasty — команда с чёткими направлениями, понятным процессом и репутацией студии, к которой возвращаются.',
]

export default async function TeamPage() {
  const payload = await getPayload({ config })

  const [result, page] = await Promise.all([
    payload.find({ collection: 'users', where: { isPublic: { equals: true } }, depth: 1, limit: 50, sort: 'name' }),
    payload.findGlobal({ slug: 'team-page' }).catch(() => null),
  ])

  const members = result.docs

  const heroHeading     = page?.heroHeading        ?? 'Студию строят'
  const heroAccent      = page?.heroHeadingAccent  ?? 'инженеры, а не менеджеры'
  const heroDescription = page?.heroDescription    ?? 'WebDynasty — это сообщество специалистов, которые делают продукт правильно: с документацией, тестами, архитектурой и уважением к чужому коду.'

  const pageStats = (page?.stats && page.stats.length > 0) ? page.stats as { value: string; label: string }[] : stats

  const historyHeading  = page?.historyHeading ?? 'Начинали как команда фрилансеров — выросли в студию с процессами'
  const historyParas    = (page?.historyParagraphs && page.historyParagraphs.length > 0)
    ? page.historyParagraphs.map((p: any) => p.text as string)
    : DEFAULT_PARAGRAPHS
  const timelineItems   = (page?.timeline && page.timeline.length > 0)
    ? page.timeline as { year: string; event: string }[]
    : DEFAULT_TIMELINE

  const valuesHeading  = page?.valuesHeading  ?? 'Принципы, по которым мы работаем'
  const valuesSubtitle = page?.valuesSubtitle ?? 'Не декларация на стене — список решений, который мы приняли однажды и с тех пор не пересматривали.'
  const pageValues     = (page?.values && page.values.length > 0)
    ? page.values.map((v: any, i: number) => ({ ...v, num: ROMAN[i] ?? String(i + 1) }))
    : values

  const showCta        = page?.showCta !== false
  const ctaHeading     = page?.ctaHeading     ?? 'Ищем сильных специалистов'
  const ctaDescription = page?.ctaDescription ?? 'Нам важна не только экспертиза, но и отношение к работе. Если вы пишете аккуратный код, умеете говорить «нет» нереальным срокам и хотите работать в команде с культурой — напишите нам.'
  const ctaEmail       = page?.ctaEmail       ?? 'hello@wdynasty.ru'

  return (
    <Box bg={C.bg} minH="100vh" style={{ fontFamily: 'var(--font-manrope, Manrope, sans-serif)' }}>

      {/* ===== HERO ===== */}
      <Box position="relative" py={{ base: 24, md: 36 }} px={4} overflow="hidden" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Box
          position="absolute" top="50%" left="50%"
          style={{ transform: 'translate(-50%,-50%)', fontSize: 'clamp(6rem,20vw,18rem)', color: 'rgba(139,92,246,0.05)', fontWeight: 900, letterSpacing: '-0.03em', pointerEvents: 'none', whiteSpace: 'nowrap', userSelect: 'none', lineHeight: 1 }}
          aria-hidden
        >
          WebDynasty
        </Box>
        <Container maxW="5xl" position="relative" textAlign="center">
          <Text fontSize="13px" fontWeight="700" letterSpacing="3px" textTransform="uppercase" color={C.p} mb={5}>
            О компании
          </Text>
          <Heading as="h1" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} fontWeight="800" letterSpacing="-0.02em" color={C.ink} lineHeight="1.1" mb={6}>
            {heroHeading}{' '}
            <Text as="span" style={gradText}>{heroAccent}</Text>
          </Heading>
          <Ornament />
          <Text fontSize={{ base: 'md', md: 'lg' }} color={C.muted} maxW="640px" mx="auto" lineHeight="1.85" mt={6}>
            {heroDescription}
          </Text>
        </Container>
      </Box>

      {/* ===== STATS (градиентная лента) ===== */}
      <Box py={{ base: 14, md: 16 }} px={4} style={{ background: GRAD3 }}>
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 2, md: pageStats.length }} gap={0}>
            {pageStats.map((s, i) => (
              <Box key={s.label} textAlign="center" py={6} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.25)' : 'none' }}>
                <Text fontSize={{ base: '3xl', md: '5xl' }} fontWeight="900" color="white" lineHeight={1} mb={2}>{s.value}</Text>
                <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="rgba(255,255,255,0.85)">{s.label}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ===== ИСТОРИЯ ===== */}
      <Box bg={C.alt} py={{ base: 18, md: 28 }} px={4}>
        <Container maxW="6xl">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 12, lg: 20 }} alignItems="center">
            <GridItem>
              <Text fontSize="13px" fontWeight="700" letterSpacing="3px" textTransform="uppercase" color={C.p} mb={4}>Наша история</Text>
              <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }} fontWeight="800" letterSpacing="-0.02em" color={C.ink} lineHeight="1.2" mb={6}>
                {historyHeading}
              </Heading>
              <VStack align="start" gap={5} color="#444" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.85">
                {historyParas.map((para, i) => (<Text key={i}>{para}</Text>))}
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="start" gap={0}>
                {timelineItems.map((item, i, arr) => (
                  <Flex key={item.year} w="full" gap={5}>
                    <VStack gap={0} align="center" flexShrink={0} w="36px">
                      <Box w="12px" h="12px" flexShrink={0} style={{ borderRadius: '50%', background: GRAD, marginTop: '6px' }} />
                      {i < arr.length - 1 && (<Box flex={1} w="2px" minH="40px" style={{ background: 'rgba(139,92,246,0.25)' }} />)}
                    </VStack>
                    <Box pb={i < arr.length - 1 ? 6 : 0}>
                      <Text fontSize="sm" fontWeight="800" color={C.p} letterSpacing="0.05em" mb={1}>{item.year}</Text>
                      <Text fontSize="sm" color="#444" lineHeight="1.65">{item.event}</Text>
                    </Box>
                  </Flex>
                ))}
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* ===== ЦЕННОСТИ ===== */}
      <Box py={{ base: 18, md: 28 }} px={4}>
        <Container maxW="6xl">
          <VStack gap={3} textAlign="center" mb={14}>
            <Text fontSize="13px" fontWeight="700" letterSpacing="3px" textTransform="uppercase" color={C.p}>Наши принципы</Text>
            <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }} fontWeight="800" letterSpacing="-0.02em" color={C.ink}>{valuesHeading}</Heading>
            <Text color={C.muted} maxW="540px" lineHeight="1.75">{valuesSubtitle}</Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {pageValues.map((v: typeof values[0]) => (
              <Box key={v.num} bg="white" p={8} style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
                <Text position="absolute" top={2} right={5} style={{ fontSize: '5rem', color: 'rgba(139,92,246,0.07)', fontWeight: 900, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }} aria-hidden>{v.num}</Text>
                <Text fontSize="xs" fontWeight="800" letterSpacing="0.15em" style={gradText} textTransform="uppercase" mb={3}>{v.num}</Text>
                <Text fontSize="xl" fontWeight="800" color={C.ink} lineHeight="1.25" mb={3}>{v.title}</Text>
                <Text fontSize="sm" color={C.muted} lineHeight="1.75">{v.text}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ===== КОМАНДА ===== */}
      <Box bg={C.alt} py={{ base: 18, md: 28 }} px={4}>
        <Container maxW="6xl">
          <VStack gap={3} textAlign="center" mb={14}>
            <Text fontSize="13px" fontWeight="700" letterSpacing="3px" textTransform="uppercase" color={C.p}>Команда</Text>
            <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }} fontWeight="800" letterSpacing="-0.02em" color={C.ink}>Люди за проектами</Heading>
            <Text color={C.muted} maxW="500px" lineHeight="1.75">Нажмите на карточку, чтобы узнать о специалисте подробнее.</Text>
          </VStack>

          {members.length === 0 ? (
            <VStack py={20} textAlign="center" gap={4}>
              <Text fontSize="2xl" fontWeight="800" color={C.ink}>Специалисты пока не представлены</Text>
              <Text fontSize="sm" color={C.muted}>Загляните позже — скоро здесь появятся профили команды.</Text>
            </VStack>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={7}>
              {members.map((m: any) => (
                <Link key={m.id} href={`/team/${m.slug ?? m.id}`} style={{ textDecoration: 'none' }}>
                  <Box
                    bg="white"
                    style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: '20px', overflow: 'hidden', height: '100%', transition: 'transform 0.25s, box-shadow 0.25s' }}
                    _hover={{ transform: 'translateY(-6px)', boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
                  >
                    <Box position="relative" h={56} overflow="hidden">
                      {m.avatar?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.avatar.url} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <Flex w="full" h="full" align="center" justify="center" style={{ background: GRAD }}>
                          <Text fontSize="5rem" fontWeight="900" color="rgba(255,255,255,0.85)" lineHeight={1} userSelect="none">
                            {m.name?.charAt(0) ?? '?'}
                          </Text>
                        </Flex>
                      )}
                      {m.craft && (
                        <Box position="absolute" bottom={3} left={3} style={{ background: 'rgba(17,17,17,0.72)', backdropFilter: 'blur(6px)', borderRadius: '999px' }} px={3} py={1}>
                          <Text fontSize="xs" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" color="white">
                            {craftLabel[m.craft] ?? m.craft}
                          </Text>
                        </Box>
                      )}
                    </Box>
                    <Box p={6}>
                      <Text fontSize="1.25rem" fontWeight="800" color={C.ink} mb={0.5}>{m.name}</Text>
                      {m.position && (<Text fontSize="sm" fontWeight="700" mb={3} style={gradText}>{m.position}</Text>)}
                      {m.bio && (
                        <Text fontSize="sm" color={C.muted} lineHeight="1.65" mb={4}
                          style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {m.bio}
                        </Text>
                      )}
                      {m.skills && m.skills.length > 0 && (
                        <HStack gap={1.5} wrap="wrap">
                          {m.skills.slice(0, 4).map((s: any, i: number) => (
                            <Text key={i} fontSize="xs" fontWeight="700" letterSpacing="0.04em" textTransform="uppercase" color={C.muted2}
                              style={{ border: '1px solid rgba(0,0,0,0.12)', padding: '3px 10px', borderRadius: '999px' }}>
                              {s.skill}
                            </Text>
                          ))}
                        </HStack>
                      )}
                    </Box>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>

      {/* ===== CTA ===== */}
      {showCta && (
        <Box py={{ base: 20, md: 28 }} px={4}>
          <Container maxW="4xl" textAlign="center">
            <Text fontSize="13px" fontWeight="700" letterSpacing="3px" textTransform="uppercase" color={C.p} mb={4}>Присоединиться</Text>
            <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }} fontWeight="800" letterSpacing="-0.02em" color={C.ink} lineHeight="1.2" mb={4}>
              {ctaHeading}
            </Heading>
            <Ornament />
            <Text fontSize={{ base: 'md', md: 'lg' }} color={C.muted} maxW="560px" mx="auto" lineHeight="1.8" mt={6} mb={8}>
              {ctaDescription}
            </Text>
            <HStack gap={4} justify="center" wrap="wrap">
              <a href={`mailto:${ctaEmail}`}
                style={{ display: 'inline-block', background: GRAD, color: '#fff', padding: '15px 36px', fontWeight: 700, fontSize: '0.9rem', borderRadius: '999px', textDecoration: 'none' }}>
                Написать нам
              </a>
              <a href="/#cta"
                style={{ display: 'inline-block', background: 'transparent', color: C.ink, padding: '14px 36px', fontWeight: 700, fontSize: '0.9rem', borderRadius: '999px', border: '1px solid #ddd', textDecoration: 'none' }}>
                Обсудить проект
              </a>
            </HStack>
          </Container>
        </Box>
      )}

    </Box>
  )
}
