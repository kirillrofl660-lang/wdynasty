'use client'

import { useState, useEffect } from 'react'
import {
  Box, Container, Heading, Text, VStack, HStack,
  Button, SimpleGrid, Flex,
  useBreakpointValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { ScrollReveal } from '../components/ScrollReveal'
import { CountUp } from '../components/CountUp'
import { LeadForm } from '@/src/widgets/lead/ui/LeadForm'

const FolkDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <defs>
      <pattern id="xstitch" x="0" y="0" width="160" height="48" patternUnits="userSpaceOnUse">
        <line x1="0" y1="2" x2="160" y2="2" stroke="#8b1c2c" strokeWidth="1.5"/>
        <line x1="0" y1="46" x2="160" y2="46" stroke="#8b1c2c" strokeWidth="1.5"/>
        <line x1="0" y1="6" x2="160" y2="6" stroke="#8b1c2c" strokeWidth=".6" opacity=".4"/>
        <line x1="0" y1="42" x2="160" y2="42" stroke="#8b1c2c" strokeWidth=".6" opacity=".4"/>
        <line x1="5" y1="10" x2="11" y2="16" stroke="#8b1c2c" strokeWidth="1" opacity=".6"/>
        <line x1="11" y1="10" x2="5" y2="16" stroke="#8b1c2c" strokeWidth="1" opacity=".6"/>
        <line x1="20" y1="9" x2="20" y2="39" stroke="#8b1c2c" strokeWidth="1.2" opacity=".8"/>
        <line x1="14" y1="15" x2="26" y2="27" stroke="#8b1c2c" strokeWidth="1.2" opacity=".8"/>
        <line x1="26" y1="15" x2="14" y2="27" stroke="#8b1c2c" strokeWidth="1.2" opacity=".8"/>
        <line x1="11" y1="24" x2="29" y2="24" stroke="#8b1c2c" strokeWidth="1.2" opacity=".8"/>
        <path d="M55 10 L65 24 L55 38 L45 24Z" fill="none" stroke="#8b1c2c" strokeWidth="1.3"/>
        <path d="M55 19 L59 24 L55 29 L51 24Z" fill="#8b1c2c" opacity=".35"/>
        <line x1="71" y1="10" x2="77" y2="16" stroke="#8b1c2c" strokeWidth="1" opacity=".55"/>
        <line x1="77" y1="10" x2="71" y2="16" stroke="#8b1c2c" strokeWidth="1" opacity=".55"/>
        <line x1="90" y1="9" x2="90" y2="39" stroke="#8b1c2c" strokeWidth="1.2" opacity=".8"/>
        <line x1="84" y1="15" x2="96" y2="27" stroke="#8b1c2c" strokeWidth="1.2" opacity=".8"/>
        <line x1="96" y1="15" x2="84" y2="27" stroke="#8b1c2c" strokeWidth="1.2" opacity=".8"/>
        <line x1="81" y1="24" x2="99" y2="24" stroke="#8b1c2c" strokeWidth="1.2" opacity=".8"/>
        <path d="M125 10 L135 24 L125 38 L115 24Z" fill="none" stroke="#8b1c2c" strokeWidth="1.3"/>
        <path d="M125 19 L129 24 L125 29 L121 24Z" fill="#8b1c2c" opacity=".35"/>
      </pattern>
      <pattern id="xstitchCream" x="0" y="0" width="160" height="48" patternUnits="userSpaceOnUse">
        <line x1="0" y1="2" x2="160" y2="2" stroke="#f5f0e6" strokeWidth="1.5"/>
        <line x1="0" y1="46" x2="160" y2="46" stroke="#f5f0e6" strokeWidth="1.5"/>
        <line x1="20" y1="9" x2="20" y2="39" stroke="#f5f0e6" strokeWidth="1.2" opacity=".75"/>
        <line x1="14" y1="15" x2="26" y2="27" stroke="#f5f0e6" strokeWidth="1.2" opacity=".75"/>
        <line x1="26" y1="15" x2="14" y2="27" stroke="#f5f0e6" strokeWidth="1.2" opacity=".75"/>
        <line x1="11" y1="24" x2="29" y2="24" stroke="#f5f0e6" strokeWidth="1.2" opacity=".75"/>
        <path d="M55 10 L65 24 L55 38 L45 24Z" fill="none" stroke="#f5f0e6" strokeWidth="1.3"/>
        <path d="M90 9 L90 39 M84 15 L96 27 M96 15 L84 27 M81 24 L99 24" stroke="#f5f0e6" strokeWidth="1.2" opacity=".75"/>
        <path d="M125 10 L135 24 L125 38 L115 24Z" fill="none" stroke="#f5f0e6" strokeWidth="1.3"/>
      </pattern>
      <symbol id="seal" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="#8b1c2c"/>
        <circle cx="50" cy="50" r="46" fill="none" stroke="#b8852a" strokeWidth="2"/>
        <circle cx="50" cy="50" r="37" fill="none" stroke="#b8852a" strokeWidth="1" opacity=".55"/>
        <rect x="31" y="31" width="38" height="38" fill="#b8852a" opacity=".92"/>
        <rect x="31" y="31" width="38" height="38" fill="#b8852a" opacity=".92" transform="rotate(45 50 50)"/>
        <circle cx="50" cy="50" r="9" fill="#8b1c2c"/>
      </symbol>
    </defs>
  </svg>
)

const XStitch = ({ inverted = false }: { inverted?: boolean }) => (
  <Box w="full" h="12" overflow="hidden" flexShrink={0} style={inverted ? { transform: 'scaleY(-1)' } : {}}>
    <svg style={{ width: '100%', height: '48px', display: 'block' }} preserveAspectRatio="xMidYMid slice">
      <rect width="100%" height="48" fill={inverted ? 'url(#xstitch)' : 'url(#xstitch)'} />
    </svg>
  </Box>
)

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

// ── Service carousel ─────────────────────────────────────────────────────────
type ServiceItem = { num: string; name: string; desc: string; tags: string[]; slug: string | undefined }

function ServiceCarousel({ items }: { items: ServiceItem[] }) {
  const [idx, setIdx] = useState(0)
  const perView = useBreakpointValue({ base: 1, md: 2, lg: 3 }) ?? 1
  const n = items.length
  const maxIdx = Math.max(0, n - perView)

  useEffect(() => {
    setIdx(i => Math.min(i, maxIdx))
  }, [maxIdx])

  const cardIcon = (
    <svg width="22" height="22" viewBox="0 0 100 100">
      <rect x="20" y="20" width="60" height="60" fill="none" stroke="rgba(245,240,230,0.9)" strokeWidth="5"/>
      <rect x="20" y="20" width="60" height="60" fill="none" stroke="rgba(245,240,230,0.9)" strokeWidth="5" transform="rotate(45 50 50)"/>
      <circle cx="50" cy="50" r="10" fill="#b8852a"/>
    </svg>
  )

  return (
    <Box>
      <Box overflow="hidden">
        <Flex
          style={{
            width: `${(n / perView) * 100}%`,
            transform: `translateX(-${idx * (100 / n)}%)`,
            transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
            alignItems: 'stretch',
          }}
        >
          {items.map((sv, i) => {
            const card = (
              <Box
                bg="white"
                h="full"
                style={{
                  border: '1.5px solid rgba(139,28,44,0.1)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                _hover={{ transform: 'translateY(-6px)', boxShadow: '0 24px 56px rgba(139,28,44,0.16)' }}
              >
                {/* Gradient accent bar */}
                <Box h="4px" style={{ background: 'linear-gradient(90deg,#8b1c2c 0%,#b8852a 100%)', flexShrink: 0 }} />

                <Box p={8} display="flex" flexDirection="column" flex={1} position="relative">
                  {/* Roman number watermark */}
                  <Text
                    position="absolute" top={4} right={6}
                    style={{ fontFamily: 'var(--font-philosopher,serif)', fontSize: '5.5rem', color: 'rgba(139,28,44,0.04)', fontWeight: 700, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}
                    aria-hidden
                  >
                    {sv.num}
                  </Text>

                  {/* Icon — crimson bg */}
                  <Flex
                    w={12} h={12} mb={6} flexShrink={0}
                    align="center" justify="center"
                    style={{ background: 'linear-gradient(135deg,#8b1c2c 0%,#6e1420 100%)', borderRadius: '6px', boxShadow: '0 6px 18px rgba(139,28,44,0.3)' }}
                  >
                    {cardIcon}
                  </Flex>

                  {/* Title */}
                  <Text style={{ fontFamily: 'var(--font-philosopher,serif)' }} fontSize="xl" fontWeight="700" color="#1a0f0a" lineHeight="1.2" mb={3}>
                    {sv.name}
                  </Text>

                  {/* Description */}
                  <Text fontSize="sm" color="#7a6050" lineHeight="1.8" mb={5} flex={1}>{sv.desc}</Text>

                  {/* Tags — filled */}
                  {sv.tags.length > 0 && (
                    <HStack gap={1.5} wrap="wrap" mb={sv.slug ? 5 : 0}>
                      {sv.tags.slice(0, 3).map(tag => (
                        <Text
                          key={tag}
                          fontSize="xs" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" color="#8b1c2c"
                          style={{ background: 'rgba(139,28,44,0.07)', padding: '4px 10px', borderRadius: '2px' }}
                        >
                          {tag}
                        </Text>
                      ))}
                    </HStack>
                  )}

                  {/* CTA with arrow */}
                  {sv.slug && (
                    <Flex align="center" gap={3} pt={4} style={{ borderTop: '1px solid rgba(139,28,44,0.09)' }}>
                      <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="#8b1c2c">
                        Подробнее
                      </Text>
                      <svg width="18" height="9" viewBox="0 0 18 9" fill="none">
                        <path d="M0 4.5H16M12.5 1L16 4.5L12.5 8" stroke="#8b1c2c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Flex>
                  )}
                </Box>
              </Box>
            )
            return sv.slug ? (
              <NextLink
                key={i}
                href={`/uslugi/${sv.slug}`}
                style={{ display: 'block', width: `${100 / n}%`, flexShrink: 0, textDecoration: 'none', padding: '0 10px' }}
              >
                {card}
              </NextLink>
            ) : (
              <Box key={i} style={{ width: `${100 / n}%`, flexShrink: 0, padding: '0 10px' }}>
                {card}
              </Box>
            )
          })}
        </Flex>
      </Box>

      {/* Navigation */}
      <Flex justify="space-between" align="center" mt={10} px={1}>
        <button
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          disabled={idx === 0}
          style={{
            width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: idx === 0 ? 'transparent' : '#8b1c2c',
            border: '1.5px solid ' + (idx === 0 ? 'rgba(139,28,44,0.2)' : '#8b1c2c'),
            borderRadius: '3px', cursor: idx === 0 ? 'default' : 'pointer',
            opacity: idx === 0 ? 0.35 : 1, transition: 'all 0.2s', flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2 L4 7 L9 12" stroke={idx === 0 ? '#8b1c2c' : '#f5f0e6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <HStack gap={2}>
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{ width: i === idx ? '28px' : '8px', height: '8px', borderRadius: '4px', background: i === idx ? '#8b1c2c' : 'rgba(139,28,44,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }}
            />
          ))}
        </HStack>

        <button
          onClick={() => setIdx(i => Math.min(maxIdx, i + 1))}
          disabled={idx >= maxIdx}
          style={{
            width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: idx >= maxIdx ? 'transparent' : '#8b1c2c',
            border: '1.5px solid ' + (idx >= maxIdx ? 'rgba(139,28,44,0.2)' : '#8b1c2c'),
            borderRadius: '3px', cursor: idx >= maxIdx ? 'default' : 'pointer',
            opacity: idx >= maxIdx ? 0.35 : 1, transition: 'all 0.2s', flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2 L10 7 L5 12" stroke={idx >= maxIdx ? '#8b1c2c' : '#f5f0e6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </Flex>
    </Box>
  )
}

const stats = [
  { target: 12, suffix: '+', label: 'Лет на рынке' },
  { target: 240, suffix: '+', label: 'Проектов сдано' },
  { target: 98, suffix: '%', label: 'Клиентов рекомендуют' },
  { target: 38, suffix: '', label: 'Специалистов в команде' },
]

const defaultServices = [
  { num: 'I',   name: '1С-Битрикс разработка',          desc: 'Корпоративные порталы, интернет-магазины, интеграции. Сертифицированные разработчики уровня «Эксперт».',   tags: ['Сайты', 'Порталы', 'Интеграции'], slug: undefined },
  { num: 'II',  name: 'Laravel + React приложения',      desc: 'Высоконагруженные веб-приложения, SPA, API-платформы и сложная бизнес-логика любого масштаба.',             tags: ['Backend', 'Frontend', 'API'],      slug: undefined },
  { num: 'III', name: 'Битрикс24: внедрение и доработка',desc: 'CRM-системы, автоматизация бизнес-процессов, интеграция с внешними сервисами и обучение команды.',        tags: ['CRM', 'Автоматизация'],           slug: undefined },
  { num: 'IV',  name: 'DevOps и инфраструктура',         desc: 'CI/CD, контейнеризация, облачные решения, мониторинг. Строим надёжный фундамент для вашего продукта.',     tags: ['Docker', 'CI/CD', 'Cloud'],       slug: undefined },
]

const whyUs = [
  { title: 'Гарантия качества',       desc: 'Внутренний code review, тест-кейсы и автотесты на каждом этапе. Сдаём только то, за что не стыдно.' },
  { title: 'Сдаём в срок',            desc: '94% проектов сданы точно в дедлайн. Открытый трекер задач и еженедельные отчёты — вы всегда знаете, где мы.' },
  { title: 'Растём вместе с вами',    desc: 'Проектируем архитектуру с прицелом на масштаб. Ваш проект сегодня — фундамент платформы завтра.' },
  { title: 'Честная цена',            desc: 'Никаких скрытых платежей. Смета фиксируется до старта проекта и не меняется без вашего согласия.' },
  { title: 'Выделенная команда',      desc: 'Персональный менеджер — один контакт для всех вопросов. Всегда на связи в рабочее время.' },
  { title: 'Признанная экспертиза',   desc: 'Золотой партнёр 1С-Битрикс, Platinum Битрикс24. Авторы открытых решений и спикеры конференций.' },
]

const pricing = [
  {
    name: 'Изба', desc: 'Лендинг или сайт-визитка', price: 'от 90 000 ₽', featured: false,
    features: ['До 5 экранов', 'Адаптив под все устройства', 'Запуск за 2–3 недели', 'Базовая SEO-настройка'],
  },
  {
    name: 'Терем', desc: 'Корпоративный сайт · выбор мастеров', price: 'от 250 000 ₽', featured: true,
    features: ['До 20 страниц + CMS', 'Индивидуальный дизайн', 'Интеграции и формы', 'Аналитика и поддержка'],
  },
  {
    name: 'Палаты', desc: 'Веб-сервис под ключ', price: 'от 600 000 ₽', featured: false,
    features: ['Сложная бизнес-логика', 'Личные кабинеты, API', 'Выделенная команда', 'SLA и развитие продукта'],
  },
]

const faqData = [
  { q: 'Сколько стоит разработка?', a: 'Лендинг — от 90 000 ₽, корпоративный сайт — от 250 000 ₽, сложный веб-сервис — от 600 000 ₽. Каждый проект получает фиксированную смету до старта работ.' },
  { q: 'Каковы типичные сроки?', a: 'Лендинг — 2–3 недели. Корпоративный сайт — 2–3 месяца. Маркетплейс или SaaS — 4–9 месяцев. Сроки фиксируются в договоре и соблюдаются в 94% проектов.' },
  { q: 'Работаете с небольшим бизнесом?', a: 'Да, среди наших клиентов — компании от 3 сотрудников до холдингов. Для небольших проектов есть выделенные тарифы и готовые решения.' },
  { q: 'Что после сдачи проекта?', a: 'Вы получаете полный пакет документации, исходный код и доступ ко всем сервисам. Гарантийное сопровождение 3 месяца бесплатно.' },
  { q: 'Можно доработать существующий проект?', a: 'Да, берёмся за аудит и доработку. Начинаем с технического аудита, затем предлагаем план — поэтапно или полный рефакторинг.' },
]

interface CmsService {
  title: string
  slug: string
  excerpt?: string
  tags?: Array<string | { tag: string }>
}

interface HomePageClientProps {
  cmsServices?: CmsService[]
  cmsPage?: any
}

export function HomePageClient({ cmsServices, cmsPage }: HomePageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // ── Resolve CMS values with static fallbacks ──────────────────────────────
  const heroSupTitle    = cmsPage?.heroSupTitle    ?? 'Студия цифрового мастерства · с 2012 года'
  const heroDescription = cmsPage?.heroDescription ?? 'Начните свою цифровую династию вместе с нами. Создаём сайты и веб-сервисы с мастерством, что передаётся из проекта в проект.'
  const pageStats       = (cmsPage?.stats?.length > 0)   ? cmsPage.stats   : stats
  const manifestoQuote  = cmsPage?.manifestoQuote  ?? 'Мы не просто пишем код — мы передаём мастерство. Каждый проект — изделие ручной работы, в котором живёт характер и точность ремесленника.'
  const manifestoAuthor = cmsPage?.manifestoAuthor ?? 'Основатель студии'
  const pageWhyUs       = (cmsPage?.whyUs?.length > 0)   ? cmsPage.whyUs   : whyUs
  const pagePricing     = (cmsPage?.pricing?.length > 0)
    ? cmsPage.pricing.map((p: any) => ({
        ...p,
        features: (p.features ?? []).map((f: any) => (typeof f === 'string' ? f : f.text)),
      }))
    : pricing
  const pageFaq         = (cmsPage?.faq?.length > 0)     ? cmsPage.faq     : faqData
  const ctaHeading      = cmsPage?.ctaHeading      ?? 'Начните свою цифровую Династию'
  const ctaDesc         = cmsPage?.ctaDescription  ?? 'Расскажите о задаче — ответим в течение рабочего дня'
  const heroMiniStats   = (cmsPage?.heroStats?.length > 0)
    ? cmsPage.heroStats as { value: string; label: string }[]
    : [{ value: '12', label: 'лет ремесла' }, { value: '240+', label: 'проектов' }, { value: '38', label: 'мастеров' }]

  const displayServices = (cmsServices && cmsServices.length > 0)
    ? cmsServices.map((s, i) => ({
        num: ROMAN[i] ?? String(i + 1),
        name: s.title,
        desc: s.excerpt ?? '',
        tags: (s.tags ?? []).map((t) => (typeof t === 'string' ? t : (t as { tag: string }).tag)),
        slug: s.slug,
      }))
    : defaultServices

  const iconSvg = (
    <svg width="22" height="22" viewBox="0 0 100 100">
      <rect x="22" y="22" width="56" height="56" fill="none" stroke="#8b1c2c" strokeWidth="5"/>
      <rect x="22" y="22" width="56" height="56" fill="none" stroke="#8b1c2c" strokeWidth="5" transform="rotate(45 50 50)"/>
      <circle cx="50" cy="50" r="9" fill="#b8852a"/>
    </svg>
  )

  const whyIcon = (
    <svg width="22" height="22" viewBox="0 0 100 100">
      <rect x="22" y="22" width="56" height="56" fill="#8b1c2c"/>
      <rect x="22" y="22" width="56" height="56" fill="#8b1c2c" transform="rotate(45 50 50)"/>
      <circle cx="50" cy="50" r="10" fill="white"/>
    </svg>
  )

  return (
    <>
      <FolkDefs />

      {/* ===== HERO ===== */}
      <Box as="section" bg="#f5f0e6" minH="100vh" display="flex" flexDirection="column" overflow="hidden" position="relative">
        <XStitch />
        <Flex flex={1} flexDir="column" align="center" justify="center" textAlign="center" px={4} py={16} position="relative" zIndex={2}>
          <Text fontSize="xs" fontWeight="700" letterSpacing="0.22em" textTransform="uppercase" color="#8b1c2c" mb={6}>
            {heroSupTitle}
          </Text>
          <Heading
            as="h1"
            style={{ fontFamily: 'var(--font-yeseva, "Yeseva One", serif)' }}
            fontSize={{ base: '6xl', md: '9xl', lg: '150px' }}
            lineHeight="0.92"
            letterSpacing="0.04em"
            color="#1a0f0a"
          >
            ДИНАСТИЯ
          </Heading>
          <Text
            style={{ fontFamily: 'var(--font-philosopher, "Philosopher", serif)' }}
            fontStyle="italic"
            fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
            color="#8b1c2c"
            letterSpacing="0.04em"
            mt={2}
          >
            Разработчиков
          </Text>
          <HStack gap={4} maxW="400px" w="full" mt={8} mb={6} justify="center">
            <Box flex={1} h="1.5px" style={{ background: 'linear-gradient(90deg, transparent, #8b1c2c 40%, #8b1c2c 60%, transparent)' }} />
            <svg width="48" height="24" viewBox="0 0 56 28">
              <ellipse cx="28" cy="14" rx="5" ry="8" fill="#8b1c2c" opacity=".8"/>
              <ellipse cx="28" cy="14" rx="8" ry="5" fill="#8b1c2c" opacity=".8"/>
              <circle cx="28" cy="14" r="3.5" fill="#b8852a"/>
              <ellipse cx="14" cy="14" rx="4" ry="6" fill="#8b1c2c" opacity=".5"/>
              <ellipse cx="14" cy="14" rx="6" ry="4" fill="#8b1c2c" opacity=".5"/>
              <ellipse cx="42" cy="14" rx="4" ry="6" fill="#8b1c2c" opacity=".5"/>
              <ellipse cx="42" cy="14" rx="6" ry="4" fill="#8b1c2c" opacity=".5"/>
            </svg>
            <Box flex={1} h="1.5px" style={{ background: 'linear-gradient(90deg, transparent, #8b1c2c 40%, #8b1c2c 60%, transparent)' }} />
          </HStack>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="#7a6050" maxW="560px" mb={8} fontWeight="500" lineHeight="1.75">
            {heroDescription}
          </Text>
          <HStack gap={4} justify="center" wrap="wrap">
            <NextLink href="#services">
              <Button bg="#8b1c2c" color="white" px={10} py={6} fontWeight="700" fontSize="sm" letterSpacing="0.1em" textTransform="uppercase" borderRadius="2px" border="2px solid #8b1c2c" _hover={{ bg: '#7a1827' }}>
                Наши услуги
              </Button>
            </NextLink>
            <NextLink href="#cta">
              <Button bg="transparent" color="#8b1c2c" px={10} py={6} fontWeight="700" fontSize="sm" letterSpacing="0.1em" textTransform="uppercase" borderRadius="2px" border="2px solid #8b1c2c" _hover={{ bg: '#8b1c2c', color: 'white' }}>
                Обсудить задачу
              </Button>
            </NextLink>
          </HStack>
          <HStack gap={4} mt={8} fontSize="sm" color="#7a6050" fontWeight="600" letterSpacing="0.04em" wrap="wrap" justify="center">
            {heroMiniStats.flatMap((s, i) => [
              ...(i > 0 ? [<Box key={`sep-${i}`} w="5px" h="5px" bg="#b8852a" style={{ transform: 'rotate(45deg)' }} />] : []),
              <Text key={s.label}>
                <Text as="span" style={{ fontFamily: 'var(--font-philosopher, serif)' }} color="#8b1c2c" fontSize="lg" fontWeight="bold">{s.value}</Text>{' '}{s.label}
              </Text>,
            ])}
          </HStack>
        </Flex>
        <Box flexShrink={0}>
          <XStitch inverted />
          <Box bg="#ede7d6" py={5} px={4}>
            <HStack wrap="wrap" justify="center" gap={2}>
              {['1С-Битрикс', 'Laravel', 'React', 'Битрикс24', 'Vue.js', 'DevOps', 'PostgreSQL', 'Docker'].map((tech) => (
                <HStack key={tech} gap={2} style={{ border: '1.5px solid rgba(139,28,44,0.3)', borderRadius: '2px' }} px={4} py={1.5}>
                  <Box w="6px" h="6px" bg="#8b1c2c" flexShrink={0} style={{ transform: 'rotate(45deg)' }} />
                  <Text fontSize="xs" fontWeight="700" letterSpacing="0.07em" textTransform="uppercase" color="#7a6050">{tech}</Text>
                </HStack>
              ))}
            </HStack>
          </Box>
        </Box>
      </Box>

      {/* ===== STATS ===== */}
      <Box as="section" bg="#ede7d6" py={20} px={4}>
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8} textAlign="center">
            {pageStats.map((s: typeof stats[0]) => (
              <ScrollReveal key={s.label}>
                <Box>
                  <Text style={{ fontFamily: 'var(--font-philosopher, serif)' }} fontSize={{ base: '3xl', md: '5xl' }} fontWeight="700" color="#8b1c2c" lineHeight={1}>
                    <CountUp end={s.target} />
                    <Text as="span" fontSize="xl" color="#b8852a">{s.suffix}</Text>
                  </Text>
                  <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="#7a6050" mt={2}>{s.label}</Text>
                </Box>
              </ScrollReveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ===== SERVICES ===== */}
      <Box id="services" as="section" bg="#f5f0e6" pt={24} pb={20}>
        <Container maxW="5xl" px={{ base: 4, md: 8 }}>
          <VStack gap={3} textAlign="center" mb={8}>
            <Text fontSize="xs" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="#8b1c2c">Чем мы занимаемся</Text>
            <Heading as="h2" style={{ fontFamily: 'var(--font-philosopher, serif)' }} fontSize={{ base: '2xl', md: '4xl' }} color="#1a0f0a">Наши услуги</Heading>
            <Text color="#7a6050" maxW="540px">Полный спектр разработки — от архитектуры до поддержки</Text>
          </VStack>
        </Container>
        <XStitch />
        <Container maxW="5xl" px={{ base: 4, md: 8 }} mt={10}>
          <ServiceCarousel items={displayServices} />
        </Container>
      </Box>

      {/* ===== MANIFESTO ===== */}
      <Box as="section" bg="#8b1c2c" py={28} px={4} position="relative" overflow="hidden">
        <Container maxW="4xl" position="relative" zIndex={2} textAlign="center">
          <svg width="60" height="60" viewBox="0 0 100 100" style={{ margin: '0 auto 24px', display: 'block' }}>
            <use href="#seal" />
          </svg>
          <Text
            as="blockquote"
            style={{ fontFamily: 'var(--font-philosopher, serif)' }}
            fontStyle="italic"
            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            lineHeight="1.5"
            color="#f5f0e6"
            maxW="820px"
            mx="auto"
          >
            {manifestoQuote}
          </Text>
          <Text fontSize="sm" fontWeight="700" letterSpacing="0.15em" textTransform="uppercase" color="#f0d9bc" mt={8}>
            {manifestoAuthor}
          </Text>
        </Container>
      </Box>

      {/* ===== WHY US ===== */}
      <Box id="whyus" as="section" bg="#ede7d6" py={24} px={4}>
        <Container maxW="6xl">
          <VStack gap={14}>
            <VStack gap={3} textAlign="center">
              <Text fontSize="xs" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="#8b1c2c">Наши преимущества</Text>
              <Heading as="h2" style={{ fontFamily: 'var(--font-philosopher, serif)' }} fontSize={{ base: '2xl', md: '4xl' }} color="#1a0f0a">Почему выбирают нас</Heading>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
              {pageWhyUs.map((w: typeof whyUs[0], i: number) => (
                <ScrollReveal key={i}>
                  <Box bg="white" style={{ border: '1.5px solid rgba(139,28,44,0.1)', borderRadius: '4px' }} p={8} transition="border-color 0.2s, transform 0.2s" _hover={{ transform: 'translateY(-3px)' }} h="full">
                    <Flex w={12} h={12} mb={5} align="center" justify="center" style={{ border: '1.5px solid rgba(139,28,44,0.2)', borderRadius: '3px' }}>
                      {whyIcon}
                    </Flex>
                    <Text style={{ fontFamily: 'var(--font-philosopher, serif)' }} fontSize="xl" fontWeight="700" mb={2} color="#1a0f0a">{w.title}</Text>
                    <Text fontSize="sm" color="#7a6050" lineHeight="1.65">{w.desc}</Text>
                  </Box>
                </ScrollReveal>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* ===== PRICING ===== */}
      <Box id="pricing" as="section" bg="#f5f0e6" pt={24} pb={20}>
        <Container maxW="6xl" px={{ base: 4, md: 8 }}>
          <VStack gap={4} textAlign="center" mb={8}>
            <Text fontSize="xs" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="#8b1c2c">Тарифы</Text>
            <Heading as="h2" style={{ fontFamily: 'var(--font-philosopher, serif)' }} fontSize={{ base: '2xl', md: '4xl' }} color="#1a0f0a">От избы до палат</Heading>
            <Text color="#7a6050" maxW="540px">Прозрачная смета фиксируется до старта и не меняется без вашего согласия</Text>
          </VStack>
        </Container>
        <XStitch />
        <Container maxW="6xl" px={{ base: 4, md: 8 }} mt={10}>
          <VStack gap={8}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full" alignItems="start">
              {pagePricing.map((p: typeof pricing[0], i: number) => (
                <ScrollReveal key={i}>
                  <Box
                    bg={p.featured ? '#8b1c2c' : 'white'}
                    color={p.featured ? '#f5f0e6' : '#1a0f0a'}
                    style={{ border: '1.5px solid', borderColor: p.featured ? 'transparent' : 'rgba(139,28,44,0.15)', borderRadius: '6px', boxShadow: p.featured ? '0 26px 52px rgba(139,28,44,0.3)' : 'none', position: 'relative' }}
                    p={p.featured ? 10 : 9}
                  >
                    {p.featured && (
                      <Box position="absolute" top="-22px" right="22px">
                        <svg width="52" height="52" viewBox="0 0 100 100"><use href="#seal" /></svg>
                      </Box>
                    )}
                    <Text style={{ fontFamily: 'var(--font-philosopher, serif)' }} fontSize="2xl" fontWeight="700" mb={1}>{p.name}</Text>
                    <Text fontSize="sm" color={p.featured ? '#f0d9bc' : '#7a6050'} mb={5}>{p.desc}</Text>
                    <Text style={{ fontFamily: 'var(--font-philosopher, serif)' }} fontSize="2xl" color={p.featured ? 'white' : '#8b1c2c'} mb={6}>{p.price}</Text>
                    <VStack align="start" gap={3} mb={8}>
                      {p.features.map((f, j) => (
                        <HStack key={j} gap={2} fontSize="sm" color={p.featured ? '#f5f0e6' : '#3a271e'}>
                          <Text color={p.featured ? '#f0d9bc' : '#b8852a'} flexShrink={0}>◆</Text>
                          <Text>{f}</Text>
                        </HStack>
                      ))}
                    </VStack>
                    <NextLink href="#cta" style={{ display: 'block' }}>
                      <Button
                        w="full" borderRadius="2px" fontWeight="700" fontSize="xs" letterSpacing="0.08em" textTransform="uppercase"
                        bg={p.featured ? '#f5f0e6' : 'transparent'}
                        color={p.featured ? '#8b1c2c' : '#8b1c2c'}
                        border="1.5px solid"
                        borderColor={p.featured ? 'transparent' : '#8b1c2c'}
                        _hover={{ bg: p.featured ? 'white' : '#8b1c2c', color: p.featured ? '#8b1c2c' : 'white' }}
                      >
                        Выбрать
                      </Button>
                    </NextLink>
                  </Box>
                </ScrollReveal>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* ===== FAQ ===== */}
      <Box id="faq" as="section" bg="#ede7d6" py={24} px={4}>
        <Container maxW="3xl">
          <VStack gap={12}>
            <VStack gap={3} textAlign="center">
              <Text fontSize="xs" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="#8b1c2c">Вопросы и ответы</Text>
              <Heading as="h2" style={{ fontFamily: 'var(--font-philosopher, serif)' }} fontSize={{ base: '2xl', md: '4xl' }} color="#1a0f0a">FAQ</Heading>
            </VStack>
            <VStack gap={3} w="full">
              {pageFaq.map((f: typeof faqData[0], i: number) => (
                <Box key={i} bg="white" style={{ border: '1.5px solid rgba(139,28,44,0.12)', borderRadius: '3px', overflow: 'hidden' }} w="full">
                  <Box
                    as="button"
                    w="full"
                    textAlign="left"
                    px={6}
                    py={5}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={4}
                    cursor="pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ fontFamily: 'var(--font-philosopher, serif)', background: 'none', border: 'none' }}
                    fontSize="lg"
                    fontWeight="700"
                    color="#1a0f0a"
                  >
                    <Text textAlign="left">{f.q}</Text>
                    <Text color="#8b1c2c" fontSize="2xl" lineHeight={1} flexShrink={0}>{openFaq === i ? '−' : '+'}</Text>
                  </Box>
                  {openFaq === i && (
                    <Box px={6} pb={5} fontSize="sm" color="#7a6050" lineHeight="1.7">{f.a}</Box>
                  )}
                </Box>
              ))}
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* ===== CTA ===== */}
      <Box id="cta" as="section" bg="#8b1c2c" py={24} px={4}>
        <Container maxW="4xl" textAlign="center" color="#f5f0e6">
          <HStack gap={4} maxW="300px" mx="auto" mb={8} justify="center">
            <Box flex={1} h="1.5px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,240,230,0.5) 40%, rgba(245,240,230,0.5) 60%, transparent)' }} />
            <svg width="40" height="24" viewBox="0 0 48 28">
              <ellipse cx="24" cy="14" rx="5" ry="8" fill="rgba(245,240,230,0.85)"/>
              <ellipse cx="24" cy="14" rx="8" ry="5" fill="rgba(245,240,230,0.85)"/>
              <circle cx="24" cy="14" r="3.5" fill="#b8852a"/>
            </svg>
            <Box flex={1} h="1.5px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,240,230,0.5) 40%, rgba(245,240,230,0.5) 60%, transparent)' }} />
          </HStack>
          <Heading as="h2" style={{ fontFamily: 'var(--font-philosopher, serif)' }} fontSize={{ base: '2xl', md: '4xl' }} mb={3}>
            {ctaHeading}
          </Heading>
          <Text fontSize="md" opacity={0.85} mb={10}>{ctaDesc}</Text>
          <LeadForm />
        </Container>
      </Box>

    </>
  )
}
