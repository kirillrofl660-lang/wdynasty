'use client'

import { useState } from 'react'
import {
  Box, Container, Heading, Text, VStack, HStack,
  Button, SimpleGrid, Flex,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { ScrollReveal } from '../components/ScrollReveal'
import { CountUp } from '../components/CountUp'
import { LeadForm } from '@/src/widgets/lead/ui/LeadForm'
import { ShieldCheck, Clock, Layers, FileText, LifeBuoy, Server } from 'lucide-react'

// ── Палитра нового дизайна (index_dinasty_final.html) ────────────────────────
const C = {
  bg: '#fafafa',
  alt: '#f3f3f6',
  ink: '#111',
  muted: '#666',
  muted2: '#777',
  p: '#8b5cf6',
  pink: '#ec4899',
  o: '#f97316',
}
const GRAD = `linear-gradient(90deg, ${C.p}, ${C.pink})`
const GRAD3 = `linear-gradient(90deg, ${C.p}, ${C.pink}, ${C.o})`
const gradText = {
  background: GRAD,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const
const gradText3 = {
  background: GRAD3,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

// ── Дефолтные данные (используются, если CMS пустой) ─────────────────────────
const stats = [
  { target: 5, suffix: '+', label: 'Лет на рынке' },
  { target: 80, suffix: '+', label: 'Проектов сдано' },
  { target: 98, suffix: '%', label: 'Клиентов рекомендуют' },
  { target: 6, suffix: '', label: 'Специалистов в команде' },
]

const defaultServices = [
  { num: 'I',   name: '1С-Битрикс разработка',           desc: 'Корпоративные порталы, интернет-магазины, интеграции. Сертифицированные разработчики уровня «Эксперт».', tags: ['Сайты', 'Порталы', 'Интеграции'], slug: undefined },
  { num: 'II',  name: 'Laravel + React приложения',       desc: 'Высоконагруженные веб-приложения, SPA, API-платформы и сложная бизнес-логика любого масштаба.',         tags: ['Backend', 'Frontend', 'API'],      slug: undefined },
  { num: 'III', name: 'Битрикс24: внедрение и доработка', desc: 'CRM-системы, автоматизация бизнес-процессов, интеграция с внешними сервисами и обучение команды.',      tags: ['CRM', 'Автоматизация'],            slug: undefined },
  { num: 'IV',  name: 'DevOps и инфраструктура',          desc: 'CI/CD, контейнеризация, облачные решения, мониторинг. Строим надёжный фундамент для вашего продукта.',  tags: ['Docker', 'CI/CD', 'Cloud'],        slug: undefined },
]

const whyUs = [
  { title: 'Гарантия качества',     desc: 'Внутренний code review, тест-кейсы и автотесты на каждом этапе. Сдаём только то, за что не стыдно.' },
  { title: 'Сдаём в срок',          desc: '94% проектов сданы точно в дедлайн. Открытый трекер задач и еженедельные отчёты — вы всегда знаете, где мы.' },
  { title: 'Растём вместе с вами',  desc: 'Проектируем архитектуру с прицелом на масштаб. Ваш проект сегодня — фундамент платформы завтра.' },
  { title: 'Честная цена',          desc: 'Никаких скрытых платежей. Смета фиксируется до старта проекта и не меняется без вашего согласия.' },
  { title: 'Выделенная команда',    desc: 'Персональный менеджер — один контакт для всех вопросов. Всегда на связи в рабочее время.' },
  { title: 'Признанная экспертиза', desc: 'Золотой партнёр 1С-Битрикс, Platinum Битрикс24. Авторы открытых решений и спикеры конференций.' },
]

// Векторные иконки по порядку пунктов «Почему выбирают нас»
const whyIcons = [ShieldCheck, Clock, Layers, FileText, LifeBuoy, Server]

const pricing = [
  { name: 'Сайт',                desc: 'Лендинг или корпоративный сайт', price: 'от 70 000 ₽', featured: false, features: ['Индивидуальный дизайн под бренд', 'Адаптив под все устройства', 'CMS для самостоятельного редактирования', 'Базовая SEO-настройка', 'Запуск за 3-4 недели'] },
  { name: 'Интернет-магазин',    desc: 'E-commerce на 1С-Битрикс',       price: 'от 315 000 ₽', featured: true,  features: ['Каталог, корзина, оформление заказа', 'Интеграция с 1С и онлайн-оплатой', 'Личный кабинет покупателя', 'Связка с CRM и службами доставки', 'Поддержка и развитие после запуска'] },
  { name: 'Веб-сервис под ключ', desc: 'CRM, SaaS и личные кабинеты',    price: 'от 1 050 000 ₽', featured: false, features: ['Сложная бизнес-логика под задачу', 'Backend на Laravel + REST API', 'Frontend на React / Next.js', 'DevOps: Docker, CI/CD, мониторинг', 'Выделенная команда и SLA'] },
]

const freelancerPointsDefault = [
  { title: 'Вас ведут опытные менеджеры',          desc: 'Два менеджера обсудят все детали проекта и предложат грамотное решение. Экспертиза с двух сторон — 1С и веб-разработка.' },
  { title: 'Сертифицированные Битрикс-разработчики', desc: 'Команда с большим опытом и официальной сертификацией 1С-Битрикс. Не «человек-оркестр», а профильные специалисты.' },
  { title: 'Знаем реальный бизнес и сроки',         desc: 'Закладываем сроки, которые реально выполнить, и говорим о рисках заранее — без сюрпризов в день сдачи.' },
]

const faqData = [
  { q: 'Сколько стоит разработка?',              a: 'Лендинг — от 70 000 ₽, корпоративный сайт — от 175 000 ₽, сложный веб-сервис — от 1 050 000 ₽. Работаем по фиксированной смете или почасово — ставка 2 500 ₽/час; смета фиксируется до старта работ.' },
  { q: 'Каковы типичные сроки?',                 a: 'Лендинг — 2–3 недели. Корпоративный сайт — 2–3 месяца. Маркетплейс или SaaS — 4–9 месяцев. Сроки фиксируются в договоре и соблюдаются в 94% проектов.' },
  { q: 'Работаете с небольшим бизнесом?',        a: 'Да, среди наших клиентов — компании от 3 сотрудников до холдингов. Для небольших проектов есть выделенные тарифы и готовые решения.' },
  { q: 'Что после сдачи проекта?',               a: 'Вы получаете полный пакет документации, исходный код и доступ ко всем сервисам. Гарантийное сопровождение 3 месяца бесплатно.' },
  { q: 'Можно доработать существующий проект?',  a: 'Да, берёмся за аудит и доработку. Начинаем с технического аудита, затем предлагаем план — поэтапно или полный рефакторинг.' },
]

interface CmsService {
  title: string
  slug: string
  excerpt?: string
  tags?: Array<string | { text?: string; tag?: string }>
}

interface HomePageV2ClientProps {
  cmsServices?: CmsService[]
  cmsPage?: any
}

// ── Переиспользуемые подзаголовки секции ─────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text fontSize="13px" fontWeight="700" letterSpacing="3px" textTransform="uppercase" color={C.p} mb={4}>
      {children}
    </Text>
  )
}

export function HomePageV2Client({ cmsServices, cmsPage }: HomePageV2ClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // ── Те же CMS-поля, что и на текущей главной, с дефолтами ──────────────────
  const heroSupTitle    = cmsPage?.heroSupTitle    ?? 'Digital Engineering Company'
  const heroDescription = cmsPage?.heroDescription ?? 'Создаём корпоративные порталы, интернет-магазины, CRM, интеграции и сложные веб-системы для бизнеса.'
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
  const freelancerLabel   = cmsPage?.freelancerLabel   ?? 'В чём разница'
  const freelancerHeading = cmsPage?.freelancerHeading ?? 'Почему не фрилансер'
  const pageFreelancer    = (cmsPage?.freelancerPoints?.length > 0) ? cmsPage.freelancerPoints : freelancerPointsDefault
  const pricingLeadTitle  = cmsPage?.pricingLeadTitle  ?? 'Почему наша ставка ниже рынка'
  const pricingLeadText   = cmsPage?.pricingLeadText   ?? 'Мы понимаем: ставки крупных IT-компаний сегодня неподъёмны для малого и среднего бизнеса. Поэтому держим стоимость часа ниже рынка — но это не «дёшево и сердито». Вы получаете специалистов с большим опытом и экспертизой по приятной цене.'
  const ctaHeading      = cmsPage?.ctaHeading      ?? 'Есть проект?'
  const ctaDesc         = cmsPage?.ctaDescription  ?? 'Бесплатно оценим задачу и предложим решение в течение 24 часов.'
  const heroMiniStats   = (cmsPage?.heroStats?.length > 0)
    ? cmsPage.heroStats as { value: string; label: string }[]
    : [{ value: '80+', label: 'проектов' }, { value: '5', label: 'лет' }, { value: '6', label: 'в команде' }]

  const displayServices = (cmsServices && cmsServices.length > 0)
    ? cmsServices.map((s, i) => ({
        num: String(i + 1).padStart(2, '0'),
        name: s.title,
        desc: s.excerpt ?? '',
        tags: (s.tags ?? [])
          .map((t) => (typeof t === 'string' ? t : (t.text ?? t.tag ?? '')))
          .filter(Boolean),
        slug: s.slug,
      }))
    : defaultServices.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0') }))

  const techBadges = ['1С-Битрикс', 'Laravel', 'React', 'Next.js', 'Docker', 'DevOps', 'Bitrix24', 'CI/CD']

  return (
    <Box bg={C.bg} color={C.ink} overflowX="hidden" style={{ fontFamily: 'var(--font-manrope, Manrope, sans-serif)' }}>

      {/* ===== HERO ===== */}
      <Box as="section" minH="100vh" position="relative" overflow="hidden" display="flex" alignItems="center">
        {/* Размытые цветовые пятна */}
        <Box position="absolute" w="700px" h="700px" left="-200px" top="-200px" bg={C.p} opacity={0.18} borderRadius="50%" style={{ filter: 'blur(140px)' }} pointerEvents="none" />
        <Box position="absolute" w="700px" h="700px" right="-200px" bottom="-200px" bg={C.pink} opacity={0.18} borderRadius="50%" style={{ filter: 'blur(140px)' }} pointerEvents="none" />

        {/* Плавающие бейджи технологий (скрыты на мобиле) */}
        <Box display={{ base: 'none', lg: 'block' }} position="absolute" inset={0} zIndex={1} pointerEvents="none">
          {([
            { t: techBadges[0], top: '12%', left: '8%' },
            { t: techBadges[1], top: '14%', right: '12%' },
            { t: techBadges[2], top: '40%', left: '4%' },
            { t: techBadges[3], top: '32%', right: '4%' },
            { t: techBadges[4], bottom: '18%', left: '10%' },
            { t: techBadges[5], bottom: '10%', right: '18%' },
          ] as Array<{ t: string; top?: string; left?: string; right?: string; bottom?: string }>).map((b, i) => (
            <Box
              key={b.t}
              position="absolute"
              style={{
                top: b.top, left: b.left, right: b.right, bottom: b.bottom,
                background: 'rgba(255,255,255,.65)',
                backdropFilter: 'blur(18px)',
                borderRadius: '30px',
                padding: '20px 30px',
                fontWeight: 800,
                fontSize: '24px',
                boxShadow: '0 20px 50px rgba(0,0,0,.06)',
                animation: `wdfloat 6s ease-in-out infinite`,
                animationDelay: `${i * 0.6}s`,
              }}
            >
              {b.t}
            </Box>
          ))}
        </Box>

        <Container maxW="1000px" position="relative" zIndex={2} textAlign="center" py={20}>
          <Text mb={6} color="#888" fontSize="14px" letterSpacing="3px" textTransform="uppercase">
            {heroSupTitle}
          </Text>
          <Heading
            as="h1"
            fontWeight="800"
            lineHeight="1"
            letterSpacing="-0.03em"
            style={{ ...gradText3, whiteSpace: 'nowrap', fontSize: 'clamp(40px, 11vw, 150px)' }}
          >
            WebDynasty
          </Heading>
          <Text mt={7} fontSize={{ base: '18px', md: '22px' }} color={C.muted} lineHeight="1.6" maxW="760px" mx="auto">
            {heroDescription}
          </Text>
          <HStack mt={10} gap={3} justify="center" wrap="wrap">
            <NextLink href="#cta">
              <Button px="30px" py="26px" borderRadius="999px" fontWeight="700" color="white" style={{ background: GRAD }} _hover={{ opacity: 0.88, transform: 'translateY(-1px)' }}>
                Обсудить проект
              </Button>
            </NextLink>
            <NextLink href="#services">
              <Button px="30px" py="26px" borderRadius="999px" fontWeight="700" bg="white" color={C.ink} border="1px solid #ddd" _hover={{ opacity: 0.88, transform: 'translateY(-1px)' }}>
                Наши услуги
              </Button>
            </NextLink>
          </HStack>
          <HStack mt={10} gap={6} justify="center" wrap="wrap">
            {heroMiniStats.map((s) => (
              <HStack key={s.label} gap={2}>
                <Text fontSize="2xl" fontWeight="900" style={gradText}>{s.value}</Text>
                <Text fontSize="sm" color={C.muted2} fontWeight="600">{s.label}</Text>
              </HStack>
            ))}
          </HStack>
        </Container>
      </Box>

      {/* ===== STATS ===== */}
      <Box as="section" py={0}>
        <Container maxW="1320px" px={{ base: 4, md: 6 }}>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap="2px" bg="#e8e8ee" borderRadius="28px" overflow="hidden">
            {pageStats.map((s: typeof stats[0]) => (
              <Box key={s.label} bg="white" py={12} px={5} textAlign="center">
                <Text fontSize={{ base: '48px', md: '64px' }} fontWeight="900" lineHeight={1} style={gradText}>
                  <CountUp end={s.target} />{s.suffix}
                </Text>
                <Text mt={2} color={C.muted2} fontSize="16px" fontWeight="500">{s.label}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ===== SERVICES ===== */}
      <Box id="services" as="section" py="110px">
        <Container maxW="1320px" px={{ base: 4, md: 6 }}>
          <ScrollReveal>
            <SectionLabel>Что мы делаем</SectionLabel>
            <Heading fontSize={{ base: '40px', md: '60px' }} fontWeight="800" letterSpacing="-2px" lineHeight={1} mb={5}>
              Наши услуги
            </Heading>
            <Text color={C.muted} maxW="760px" fontSize="18px" lineHeight="1.6">
              Полный цикл разработки — от идеи до поддержки в продакшене.
            </Text>
          </ScrollReveal>

          <Box mt={12}>
            {displayServices.map((sv) => {
              const row = (
                <Flex
                  align="center"
                  gap={{ base: 4, md: 8 }}
                  py={9}
                  borderBottom="1px solid #e8e8ee"
                  className="wd-service"
                  cursor={sv.slug ? 'pointer' : 'default'}
                >
                  <Text fontSize={{ base: '36px', md: '56px' }} color="#e0e0e8" fontWeight="900" lineHeight={1} flexShrink={0} w={{ base: '60px', md: '80px' }}>
                    {sv.num}
                  </Text>
                  <Box flex={1}>
                    <Text className="wd-service-title" fontSize={{ base: '26px', md: '38px' }} fontWeight="800" mb={2} transition="color .3s">
                      {sv.name}
                    </Text>
                    <Text color={C.muted2} fontSize="16px" maxW="560px">{sv.desc}</Text>
                  </Box>
                  {sv.tags.length > 0 && (
                    <HStack gap={2} wrap="wrap" display={{ base: 'none', md: 'flex' }} flexShrink={0}>
                      {sv.tags.slice(0, 3).map((tag) => (
                        <Text key={tag} px="14px" py="6px" borderRadius="999px" bg="#f0effe" color={C.p} fontSize="13px" fontWeight="700">
                          {tag}
                        </Text>
                      ))}
                    </HStack>
                  )}
                </Flex>
              )
              return sv.slug ? (
                <NextLink key={sv.num} href={`/uslugi/${sv.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  {row}
                </NextLink>
              ) : (
                <Box key={sv.num}>{row}</Box>
              )
            })}
          </Box>
        </Container>
      </Box>

      {/* ===== MANIFESTO ===== */}
      <Box as="section" bg={C.alt} py="110px" px={4}>
        <Container maxW="900px" textAlign="center">
          <Text fontSize="80px" lineHeight={1} fontWeight="900" mb={4} style={gradText3} aria-hidden>“</Text>
          <Text as="blockquote" fontSize={{ base: '24px', md: '34px' }} fontWeight="800" letterSpacing="-1px" lineHeight="1.35" color={C.ink}>
            {manifestoQuote}
          </Text>
          <Text mt={8} fontSize="14px" fontWeight="700" letterSpacing="2px" textTransform="uppercase" color={C.p}>
            {manifestoAuthor}
          </Text>
        </Container>
      </Box>

      {/* ===== WHY US ===== */}
      <Box id="whyus" as="section" py="110px">
        <Container maxW="1320px" px={{ base: 4, md: 6 }}>
          <ScrollReveal>
            <SectionLabel>Наши принципы</SectionLabel>
            <Heading fontSize={{ base: '40px', md: '60px' }} fontWeight="800" letterSpacing="-2px" lineHeight={1}>
              Почему выбирают нас
            </Heading>
          </ScrollReveal>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={5} mt={12}>
            {pageWhyUs.map((w: typeof whyUs[0], i: number) => (
              <ScrollReveal key={i}>
                <Flex
                  bg="white" p={10} borderRadius="28px" gap={5} align="start" h="full"
                  style={{ boxShadow: '0 6px 30px rgba(0,0,0,.05)' }}
                  transition="transform .25s"
                  _hover={{ transform: 'translateY(-4px)' }}
                >
                  <Flex w="56px" h="56px" borderRadius="16px" align="center" justify="center" flexShrink={0} style={{ background: GRAD }}>
                    {(() => {
                      const Ic = whyIcons[i % whyIcons.length]
                      return <Ic size={26} color="#ffffff" strokeWidth={2} />
                    })()}
                  </Flex>
                  <Box>
                    <Text fontSize="22px" fontWeight="800" mb={2}>{w.title}</Text>
                    <Text color={C.muted2} fontSize="15px" lineHeight="1.6">{w.desc}</Text>
                  </Box>
                </Flex>
              </ScrollReveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ===== ПОЧЕМУ НЕ ФРИЛАНСЕР ===== */}
      <Box id="why-not-freelancer" as="section" bg={C.alt} py="110px">
        <Container maxW="1320px" px={{ base: 4, md: 6 }}>
          <ScrollReveal>
            <SectionLabel>{freelancerLabel}</SectionLabel>
            <Heading fontSize={{ base: '40px', md: '60px' }} fontWeight="800" letterSpacing="-2px" lineHeight={1}>
              {freelancerHeading}
            </Heading>
          </ScrollReveal>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mt={12}>
            {pageFreelancer.map((p: typeof freelancerPointsDefault[0], i: number) => (
              <ScrollReveal key={i}>
                <Box
                  bg="white" p={10} borderRadius="28px" h="full"
                  style={{ boxShadow: '0 6px 30px rgba(0,0,0,.05)' }}
                  transition="transform .25s"
                  _hover={{ transform: 'translateY(-4px)' }}
                >
                  <Flex w="48px" h="48px" mb={6} borderRadius="14px" align="center" justify="center" style={{ background: GRAD }}>
                    <Text fontSize="20px" fontWeight="900" color="white" lineHeight={1}>{String(i + 1).padStart(2, '0')}</Text>
                  </Flex>
                  <Text fontSize="22px" fontWeight="800" mb={2}>{p.title}</Text>
                  <Text color={C.muted2} fontSize="15px" lineHeight="1.6">{p.desc}</Text>
                </Box>
              </ScrollReveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ===== PRICING ===== */}
      <Box id="pricing" as="section" py="110px">
        <Container maxW="1320px" px={{ base: 4, md: 6 }}>
          <ScrollReveal>
            <SectionLabel>Тарифы</SectionLabel>
            <Heading fontSize={{ base: '40px', md: '60px' }} fontWeight="800" letterSpacing="-2px" lineHeight={1} mb={5}>
              Стоимость разработки
            </Heading>
            <Text color={C.muted} maxW="760px" fontSize="18px" lineHeight="1.6">
              Прозрачная смета фиксируется до старта и не меняется без вашего согласия.
            </Text>
          </ScrollReveal>

          {(pricingLeadTitle || pricingLeadText) && (
            <ScrollReveal>
              <Box
                mt={10}
                p={{ base: 7, md: 9 }}
                borderRadius="24px"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,.09), rgba(236,72,153,.09))',
                  border: '1px solid rgba(139,92,246,.22)',
                }}
              >
                {pricingLeadTitle && (
                  <Text fontSize={{ base: '22px', md: '26px' }} fontWeight="800" mb={3} style={gradText}>
                    {pricingLeadTitle}
                  </Text>
                )}
                {pricingLeadText && (
                  <Text color="#444" fontSize={{ base: '15px', md: '17px' }} lineHeight="1.7" maxW="900px">
                    {pricingLeadText}
                  </Text>
                )}
              </Box>
            </ScrollReveal>
          )}

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mt={12} alignItems="start">
            {pagePricing.map((p: typeof pricing[0], i: number) => (
              <ScrollReveal key={i}>
                <Box
                  borderRadius="28px"
                  p={10}
                  h="full"
                  color={p.featured ? 'white' : C.ink}
                  style={{
                    background: p.featured ? GRAD : 'white',
                    boxShadow: p.featured ? '0 24px 60px rgba(139,92,246,.3)' : '0 8px 40px rgba(0,0,0,.06)',
                  }}
                >
                  <Text fontSize="26px" fontWeight="800" mb={1}>{p.name}</Text>
                  <Text fontSize="15px" opacity={0.8} mb={5} color={p.featured ? 'white' : C.muted2}>{p.desc}</Text>
                  <Text fontSize="32px" fontWeight="900" mb={6}>{p.price}</Text>
                  <VStack align="start" gap={3} mb={8}>
                    {p.features.map((f: string, j: number) => (
                      <HStack key={j} gap={2} fontSize="15px" align="start">
                        <Text color={p.featured ? 'white' : C.p} flexShrink={0} fontWeight="800">◆</Text>
                        <Text color={p.featured ? 'white' : '#444'}>{f}</Text>
                      </HStack>
                    ))}
                  </VStack>
                  <NextLink href="#cta" style={{ display: 'block' }}>
                    <Button
                      w="full" borderRadius="999px" fontWeight="700"
                      bg={p.featured ? 'white' : 'transparent'}
                      color={p.featured ? C.p : C.ink}
                      border={p.featured ? 'none' : '1px solid #ddd'}
                      _hover={{ opacity: 0.9, transform: 'translateY(-2px)' }}
                    >
                      Выбрать
                    </Button>
                  </NextLink>
                </Box>
              </ScrollReveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ===== FAQ ===== */}
      <Box id="faq" as="section" py="110px">
        <Container maxW="900px" px={{ base: 4, md: 6 }}>
          <ScrollReveal>
            <SectionLabel>Вопросы и ответы</SectionLabel>
            <Heading fontSize={{ base: '40px', md: '60px' }} fontWeight="800" letterSpacing="-2px" lineHeight={1}>
              FAQ
            </Heading>
          </ScrollReveal>
          <VStack gap={3} mt={12} align="stretch">
            {pageFaq.map((f: typeof faqData[0], i: number) => {
              const open = openFaq === i
              return (
                <Box key={i} bg="white" borderRadius="20px" overflow="hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,.04)' }}>
                  <Box
                    as="button"
                    w="full"
                    textAlign="left"
                    px={8}
                    py={7}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={5}
                    cursor="pointer"
                    fontSize="18px"
                    fontWeight="700"
                    onClick={() => setOpenFaq(open ? null : i)}
                    _hover={{ color: C.p }}
                  >
                    <Text textAlign="left">{f.q}</Text>
                    <Text color={C.p} fontSize="26px" lineHeight={1} flexShrink={0} style={{ transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .3s' }}>+</Text>
                  </Box>
                  {open && (
                    <Box px={8} pb={7} color={C.muted} fontSize="16px" lineHeight="1.7">{f.a}</Box>
                  )}
                </Box>
              )
            })}
          </VStack>
        </Container>
      </Box>

      {/* ===== CTA ===== */}
      <Box id="cta" as="section" py="120px" px={4} position="relative" overflow="hidden">
        <Box position="absolute" w="600px" h="600px" left="-100px" top="-100px" bg={C.p} opacity={0.1} borderRadius="50%" style={{ filter: 'blur(120px)' }} pointerEvents="none" />
        <Box position="absolute" w="600px" h="600px" right="-100px" bottom="-100px" bg={C.pink} opacity={0.1} borderRadius="50%" style={{ filter: 'blur(120px)' }} pointerEvents="none" />
        <Container maxW="640px" position="relative" zIndex={1} textAlign="center">
          <Heading fontSize={{ base: '50px', md: '80px' }} fontWeight="900" lineHeight="0.9" mb={7}>
            {ctaHeading}<br /><Box as="span" style={gradText3}>Давайте обсудим.</Box>
          </Heading>
          <Text color={C.muted} fontSize="20px" lineHeight="1.6" mb={10} maxW="600px" mx="auto">{ctaDesc}</Text>
          {/* Тёмная градиентная карточка под форму — LeadForm рассчитан на тёмный фон */}
          <Box borderRadius="28px" p={{ base: 6, md: 10 }} style={{ background: 'linear-gradient(135deg, #1a1030, #2a1a3a)' }} boxShadow="0 30px 80px rgba(139,92,246,.25)">
            <LeadForm />
          </Box>
        </Container>
      </Box>

      <style>{`
        @keyframes wdfloat { 50% { transform: translateY(-12px); } }
        .wd-service:hover .wd-service-title {
          background: ${GRAD};
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </Box>
  )
}
