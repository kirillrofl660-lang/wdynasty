export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Flex, Grid, GridItem } from '@chakra-ui/react'

export const metadata: Metadata = {
  title: 'О компании | Династия Разработчиков',
  description: 'Студия Династия — команда мастеров веб-разработки. Узнайте нашу историю, ценности и познакомьтесь со специалистами, которые создадут ваш продукт.',
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

const craftLabel: Record<string, string> = {
  dev: 'Разработка',
  design: 'Дизайн',
  devops: 'DevOps',
  management: 'Управление',
  analytics: 'Аналитика',
  qa: 'QA',
}

const stats = [
  { value: '7+', label: 'Лет на рынке' },
  { value: '120+', label: 'Проектов сдано' },
  { value: '40+', label: 'Мастеров в команде' },
  { value: '98%', label: 'Клиентов возвращается' },
]

const values = [
  {
    num: 'I',
    title: 'Ремесло, а не конвейер',
    text: 'Каждый проект — штучная работа. Мы не тиражируем шаблоны, а строим архитектуру под задачу заказчика.',
  },
  {
    num: 'II',
    title: 'Честность в сроках',
    text: 'Называем реальные даты. Если что-то идёт не так — сообщаем первыми, а не в день дедлайна.',
  },
  {
    num: 'III',
    title: 'Код как наследие',
    text: 'Пишем так, чтобы следующий разработчик не ругался. Документация, тесты, читаемая структура — это часть работы.',
  },
  {
    num: 'IV',
    title: 'Глубина экспертизы',
    text: 'Специализация, а не универсальность. Каждый мастер — эксперт своего цеха, а не «немного умеет всё».',
  },
  {
    num: 'V',
    title: 'Долгие отношения',
    text: 'Строим так, чтобы клиент вернулся через год с новой задачей. Поддержка, развитие, совместный рост.',
  },
  {
    num: 'VI',
    title: 'Без магии — только система',
    text: 'Понятный процесс, измеримый результат. Никакого тумана — только этапы, задачи и понятная ответственность.',
  },
]

// ── Reusable SVG divider ────────────────────────────────────────────────────
function XStitch({ light = false }: { light?: boolean }) {
  const color = light ? 'rgba(245,240,230,0.35)' : '#8b1c2c'
  return (
    <Box w="full" h="12" overflow="hidden" aria-hidden>
      <svg style={{ width: '100%', height: '48px', display: 'block' }} preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`xs-${light ? 'l' : 'd'}`} x="0" y="0" width="160" height="48" patternUnits="userSpaceOnUse">
            <line x1="0" y1="2" x2="160" y2="2" stroke={color} strokeWidth="1.5"/>
            <line x1="0" y1="46" x2="160" y2="46" stroke={color} strokeWidth="1.5"/>
            <line x1="20" y1="9" x2="20" y2="39" stroke={color} strokeWidth="1.2" opacity=".8"/>
            <line x1="14" y1="15" x2="26" y2="27" stroke={color} strokeWidth="1.2" opacity=".8"/>
            <line x1="26" y1="15" x2="14" y2="27" stroke={color} strokeWidth="1.2" opacity=".8"/>
            <line x1="11" y1="24" x2="29" y2="24" stroke={color} strokeWidth="1.2" opacity=".8"/>
            <path d="M55 10 L65 24 L55 38 L45 24Z" fill="none" stroke={color} strokeWidth="1.3"/>
            <line x1="90" y1="9" x2="90" y2="39" stroke={color} strokeWidth="1.2" opacity=".8"/>
            <line x1="84" y1="15" x2="96" y2="27" stroke={color} strokeWidth="1.2" opacity=".8"/>
            <line x1="96" y1="15" x2="84" y2="27" stroke={color} strokeWidth="1.2" opacity=".8"/>
            <line x1="81" y1="24" x2="99" y2="24" stroke={color} strokeWidth="1.2" opacity=".8"/>
            <path d="M125 10 L135 24 L125 38 L115 24Z" fill="none" stroke={color} strokeWidth="1.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="48" fill={`url(#xs-${light ? 'l' : 'd'})`} />
      </svg>
    </Box>
  )
}

// ── Inline ornament ─────────────────────────────────────────────────────────
function Ornament() {
  return (
    <HStack gap={3} aria-hidden w="260px" mx="auto">
      <Box flex={1} h="1px" style={{ background: 'linear-gradient(90deg,transparent,#8b1c2c)' }} />
      <svg width="20" height="12" viewBox="0 0 28 16" style={{ flexShrink: 0 }}>
        <ellipse cx="14" cy="8" rx="4" ry="6" fill="#8b1c2c" opacity=".6"/>
        <ellipse cx="14" cy="8" rx="6" ry="4" fill="#8b1c2c" opacity=".6"/>
        <circle cx="14" cy="8" r="2.5" fill="#b8852a"/>
      </svg>
      <Box flex={1} h="1px" style={{ background: 'linear-gradient(90deg,#8b1c2c,transparent)' }} />
    </HStack>
  )
}

// ── Default fallback data ────────────────────────────────────────────────────
const DEFAULT_TIMELINE = [
  { year: '2013', event: 'Первый проект. Два разработчика, один заказчик.' },
  { year: '2016', event: 'Специализация на 1С-Битрикс. Первый корпоративный клиент.' },
  { year: '2018', event: 'Перестройка процессов. Внедрение Agile-спринтов.' },
  { year: '2020', event: 'Выход на Laravel + React-разработку. Расширение до 15 человек.' },
  { year: '2022', event: 'Открытие DevOps-цеха. Первые проекты с Kubernetes.' },
  { year: 'Сейчас', event: 'Четыре цеха, полный цикл от дизайна до деплоя.' },
]

const DEFAULT_PARAGRAPHS = [
  'Первый проект — сайт местного интернет-магазина за 2013 год. Тогда нас было двое, код писался в Notepad++ и деплоился по FTP. Зато в срок и без лишних вопросов.',
  'К 2017-му выросли до пяти человек и стали специализироваться на Битрикс-разработке. Научились горько: брали слишком много, сдавали с задержкой, теряли клиентов. Решили перестроить всё с нуля — процессы, найм, архитектуру.',
  'Сегодня «Династия» — команда с чёткими цехами, понятным процессом и репутацией студии, к которой возвращаются.',
]

export default async function TeamPage() {
  const payload = await getPayload({ config })

  const [result, page] = await Promise.all([
    payload.find({
      collection: 'users',
      where: { isPublic: { equals: true } },
      depth: 1,
      limit: 50,
      sort: 'name',
    }),
    payload.findGlobal({ slug: 'team-page' }).catch(() => null),
  ])

  const members = result.docs

  // ── Resolve content with CMS fallback ──────────────────────────────────────
  const heroHeading     = page?.heroHeading        ?? 'Студия, которую строят'
  const heroAccent      = page?.heroHeadingAccent  ?? 'мастера, а не менеджеры'
  const heroDescription = page?.heroDescription    ?? '«Династия» — это не агентство с открытым набором. Это сообщество специалистов, которые делают продукт правильно: с документацией, тестами, архитектурой и уважением к чужому коду.'

  const pageStats = (page?.stats && page.stats.length > 0)
    ? page.stats as { value: string; label: string }[]
    : stats

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
  const ctaHeading     = page?.ctaHeading     ?? 'Ищем мастеров своего дела'
  const ctaDescription = page?.ctaDescription ?? 'Нам важна не только экспертиза, но и отношение к работе. Если вы пишете аккуратный код, умеете говорить «нет» нереальным срокам и хотите работать в команде с культурой — напишите нам.'
  const ctaEmail       = page?.ctaEmail       ?? 'hello@wdynasty.ru'

  return (
    <Box bg="#f5f0e6" minH="100vh">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <Box
        position="relative"
        py={{ base: 24, md: 36 }}
        px={4}
        overflow="hidden"
        style={{ borderBottom: '1.5px solid rgba(139,28,44,0.12)' }}
      >
        <Box
          position="absolute" top="50%" left="50%"
          style={{ transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-yeseva,"Yeseva One",serif)', fontSize: 'clamp(8rem,25vw,22rem)', color: 'rgba(139,28,44,0.04)', fontWeight: 700, pointerEvents: 'none', whiteSpace: 'nowrap', userSelect: 'none', lineHeight: 1 }}
          aria-hidden
        >
          ДИНАСТИЯ
        </Box>

        <Container maxW="5xl" position="relative" textAlign="center">
          <Text fontSize="xs" fontWeight="700" letterSpacing="0.25em" textTransform="uppercase" color="#8b1c2c" mb={5}>
            ◆ О компании ◆
          </Text>
          <Heading
            as="h1"
            style={{ fontFamily: 'var(--font-philosopher,"Philosopher",serif)' }}
            fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
            fontWeight="700"
            color="#1a0f0a"
            lineHeight="1.1"
            mb={6}
          >
            {heroHeading}<br />
            <Text as="span" color="#8b1c2c" fontStyle="italic">{heroAccent}</Text>
          </Heading>
          <Ornament />
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="#7a6050"
            maxW="600px"
            mx="auto"
            lineHeight="1.85"
            mt={5}
          >
            {heroDescription}
          </Text>
        </Container>
      </Box>

      <XStitch />

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
      <Box bg="#8b1c2c" py={{ base: 14, md: 18 }} px={4}>
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 2, md: pageStats.length }} gap={0}>
            {pageStats.map((s, i) => (
              <Box
                key={s.label}
                textAlign="center"
                py={8}
                style={{ borderLeft: i > 0 ? '1px solid rgba(245,240,230,0.12)' : 'none' }}
              >
                <Text
                  style={{ fontFamily: 'var(--font-philosopher,"Philosopher",serif)' }}
                  fontSize={{ base: '3xl', md: '5xl' }}
                  fontWeight="700"
                  color="#f5f0e6"
                  lineHeight={1}
                  mb={2}
                >
                  {s.value}
                </Text>
                <Text fontSize="xs" fontWeight="700" letterSpacing="0.15em" textTransform="uppercase" color="rgba(245,240,230,0.6)">
                  {s.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <XStitch light />

      {/* ══════════════════════════════════════════
          ИСТОРИЯ
      ══════════════════════════════════════════ */}
      <Box bg="#ede7d6" py={{ base: 18, md: 28 }} px={4}>
        <Container maxW="6xl">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 12, lg: 20 }} alignItems="center">
            <GridItem>
              <Text fontSize="xs" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="#8b1c2c" mb={4}>
                Наша история
              </Text>
              <Heading
                as="h2"
                style={{ fontFamily: 'var(--font-philosopher,"Philosopher",serif)' }}
                fontSize={{ base: '2xl', md: '4xl' }}
                fontWeight="700"
                color="#1a0f0a"
                lineHeight="1.2"
                mb={6}
              >
                {historyHeading}
              </Heading>
              <VStack align="start" gap={5} color="#3a271e" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.85">
                {historyParas.map((para, i) => (
                  <Text key={i}>{para}</Text>
                ))}
              </VStack>
            </GridItem>

            <GridItem>
              <VStack align="start" gap={0}>
                {timelineItems.map((item, i, arr) => (
                  <Flex key={item.year} w="full" gap={5}>
                    <VStack gap={0} align="center" flexShrink={0} w="36px">
                      <Box
                        w="10px" h="10px" flexShrink={0}
                        style={{ borderRadius: '50%', background: '#8b1c2c', border: '2px solid #b8852a', marginTop: '6px' }}
                      />
                      {i < arr.length - 1 && (
                        <Box flex={1} w="1px" minH="40px" style={{ background: 'rgba(139,28,44,0.2)' }} />
                      )}
                    </VStack>
                    <Box pb={i < arr.length - 1 ? 6 : 0}>
                      <Text
                        style={{ fontFamily: 'var(--font-philosopher,"Philosopher",serif)' }}
                        fontSize="sm" fontWeight="700" color="#8b1c2c" letterSpacing="0.05em" mb={1}
                      >
                        {item.year}
                      </Text>
                      <Text fontSize="sm" color="#3a271e" lineHeight="1.65">{item.event}</Text>
                    </Box>
                  </Flex>
                ))}
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      <XStitch />

      {/* ══════════════════════════════════════════
          ЦЕННОСТИ
      ══════════════════════════════════════════ */}
      <Box py={{ base: 18, md: 28 }} px={4}>
        <Container maxW="6xl">
          <VStack gap={3} textAlign="center" mb={14}>
            <Text fontSize="xs" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="#8b1c2c">
              Кодекс мастера
            </Text>
            <Heading
              as="h2"
              style={{ fontFamily: 'var(--font-philosopher,"Philosopher",serif)' }}
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="700"
              color="#1a0f0a"
            >
              {valuesHeading}
            </Heading>
            <Text color="#7a6050" maxW="500px" lineHeight="1.75">{valuesSubtitle}</Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {pageValues.map((v) => (
              <Box
                key={v.num}
                bg="white"
                p={8}
                style={{ border: '1.5px solid rgba(139,28,44,0.1)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}
              >
                <Text
                  position="absolute" top={2} right={4}
                  style={{ fontFamily: 'var(--font-philosopher,"Philosopher",serif)', fontSize: '5rem', color: 'rgba(139,28,44,0.05)', fontWeight: 700, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}
                  aria-hidden
                >
                  {v.num}
                </Text>
                <Text
                  style={{ fontFamily: 'var(--font-philosopher,"Philosopher",serif)' }}
                  fontSize="xs" fontWeight="700" letterSpacing="0.15em" color="#b8852a" textTransform="uppercase" mb={3}
                >
                  {v.num}
                </Text>
                <Text
                  style={{ fontFamily: 'var(--font-philosopher,"Philosopher",serif)' }}
                  fontSize="xl" fontWeight="700" color="#1a0f0a" lineHeight="1.25" mb={3}
                >
                  {v.title}
                </Text>
                <Text fontSize="sm" color="#7a6050" lineHeight="1.75">{v.text}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <XStitch />

      {/* ══════════════════════════════════════════
          КОМАНДА
      ══════════════════════════════════════════ */}
      <Box bg="#ede7d6" py={{ base: 18, md: 28 }} px={4}>
        <Container maxW="6xl">
          <VStack gap={3} textAlign="center" mb={14}>
            <Text fontSize="xs" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="#8b1c2c">
              Мастера
            </Text>
            <Heading
              as="h2"
              style={{ fontFamily: 'var(--font-philosopher,"Philosopher",serif)' }}
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="700"
              color="#1a0f0a"
            >
              Люди за проектами
            </Heading>
            <Text color="#7a6050" maxW="500px" lineHeight="1.75">
              Нажмите на карточку, чтобы узнать о специалисте подробнее.
            </Text>
          </VStack>

          {members.length === 0 ? (
            <VStack py={20} textAlign="center" gap={4}>
              <Text style={{ fontFamily: 'var(--font-philosopher,serif)' }} fontSize="2xl" color="#7a6050">
                Мастера пока не представлены
              </Text>
              <Text fontSize="sm" color="#7a6050">Загляните позже — скоро здесь появятся профили команды.</Text>
            </VStack>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={7}>
              {members.map((m: any) => (
                <Link key={m.id} href={`/team/${m.slug ?? m.id}`} style={{ textDecoration: 'none' }}>
                  <Box
                    bg="white"
                    style={{ border: '1.5px solid rgba(139,28,44,0.12)', borderRadius: '4px', overflow: 'hidden', height: '100%', transition: 'transform 0.25s, box-shadow 0.25s' }}
                    _hover={{ transform: 'translateY(-4px)', boxShadow: '0 16px 40px rgba(139,28,44,0.15)' }}
                  >
                    <Box position="relative" h={56} bg="#f5f0e6" overflow="hidden">
                      {m.avatar?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.avatar.url} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <Flex w="full" h="full" align="center" justify="center" style={{ background: 'linear-gradient(160deg,#8b1c2c 0%,#6e1420 100%)' }}>
                          <Text style={{ fontFamily: 'var(--font-yeseva,"Yeseva One",serif)', fontSize: '5rem', color: 'rgba(245,240,230,0.22)', lineHeight: 1, userSelect: 'none' }}>
                            {m.name?.charAt(0) ?? '?'}
                          </Text>
                        </Flex>
                      )}
                      {m.craft && (
                        <Box
                          position="absolute" bottom={3} left={3}
                          style={{ background: 'rgba(26,15,10,0.72)', backdropFilter: 'blur(6px)', border: '1px solid rgba(184,133,42,0.45)', borderRadius: '2px' }}
                          px={3} py={1}
                        >
                          <Text fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color="#f0d9bc">
                            {craftLabel[m.craft] ?? m.craft}
                          </Text>
                        </Box>
                      )}
                    </Box>
                    <Box p={6}>
                      <Text style={{ fontFamily: 'var(--font-philosopher,"Philosopher",serif)', fontSize: '1.25rem', fontWeight: 700 }} color="#1a0f0a" mb={0.5}>
                        {m.name}
                      </Text>
                      {m.position && (
                        <Text fontSize="sm" color="#8b1c2c" fontWeight="600" mb={3}>{m.position}</Text>
                      )}
                      {m.bio && (
                        <Text fontSize="sm" color="#7a6050" lineHeight="1.65" mb={4}
                          style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {m.bio}
                        </Text>
                      )}
                      {m.skills && m.skills.length > 0 && (
                        <HStack gap={1.5} wrap="wrap">
                          {m.skills.slice(0, 4).map((s: any, i: number) => (
                            <Text key={i} fontSize="xs" fontWeight="700" letterSpacing="0.05em" textTransform="uppercase" color="#7a6050"
                              style={{ border: '1px solid rgba(139,28,44,0.2)', padding: '3px 8px', borderRadius: '1px' }}>
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

      {showCta && (
        <>
          <XStitch />

          {/* ══════════════════════════════════════════
              JOIN CTA
          ══════════════════════════════════════════ */}
          <Box py={{ base: 20, md: 28 }} px={4}>
            <Container maxW="4xl" textAlign="center">
              <Text fontSize="xs" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="#8b1c2c" mb={4}>
                Присоединиться
              </Text>
              <Heading
                as="h2"
                style={{ fontFamily: 'var(--font-philosopher,"Philosopher",serif)' }}
                fontSize={{ base: '2xl', md: '4xl' }}
                fontWeight="700"
                color="#1a0f0a"
                lineHeight="1.2"
                mb={4}
              >
                {ctaHeading}
              </Heading>
              <Ornament />
              <Text fontSize={{ base: 'md', md: 'lg' }} color="#7a6050" maxW="520px" mx="auto" lineHeight="1.8" mt={5} mb={8}>
                {ctaDescription}
              </Text>
              <HStack gap={4} justify="center" wrap="wrap">
                <a
                  href={`mailto:${ctaEmail}`}
                  style={{ display: 'inline-block', background: '#8b1c2c', color: '#f5f0e6', padding: '14px 36px', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', textDecoration: 'none' }}
                >
                  Написать нам
                </a>
                <a
                  href="/#cta"
                  style={{ display: 'inline-block', background: 'transparent', color: '#8b1c2c', padding: '13px 36px', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', border: '1.5px solid rgba(139,28,44,0.4)', textDecoration: 'none' }}
                >
                  Обсудить проект
                </a>
              </HStack>
            </Container>
          </Box>
        </>
      )}

    </Box>
  )
}
