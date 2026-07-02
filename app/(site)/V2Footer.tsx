import { Box } from '@chakra-ui/react/box'
import { Container } from '@chakra-ui/react/container'
import { SimpleGrid } from '@chakra-ui/react/simple-grid'
import { VStack, HStack } from '@chakra-ui/react/stack'
import { Text } from '@chakra-ui/react/text'
import Link from 'next/link'

const GRAD = 'linear-gradient(90deg, #6b21d4, #be1860)'
const gradText = {
  color: '#6b21d4',
  background: GRAD,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
} as const

type FooterLink = { label: string; href: string }

interface V2FooterProps {
  settings?: {
    brandDescription?: string | null
    servicesLinks?: FooterLink[] | null
    companyLinks?: FooterLink[] | null
    contactEmail?: string | null
    contactHours?: string | null
    copyrightText?: string | null
    copyrightNote?: string | null
  } | null
  /** Услуги из коллекции `services` — динамически в колонку «Услуги» */
  services?: { title: string; slug: string }[]
}

const DEFAULT_SERVICES: FooterLink[] = [
  { label: '1С-Битрикс',      href: '/#services' },
  { label: 'Laravel + React', href: '/#services' },
  { label: 'Битрикс24',       href: '/#services' },
  { label: 'DevOps',          href: '/#services' },
]

const DEFAULT_COMPANY: FooterLink[] = [
  { label: 'О нас',     href: '/#whyus' },
  { label: 'Команда',   href: '/team' },
  { label: 'Портфолио', href: '/uslugi' },
  { label: 'Блог',      href: '/blog' },
]

const linkStyle = {
  fontSize: '14px',
  color: '#999',
  textDecoration: 'none',
  transition: 'color .2s',
  _hover: { color: '#fff' },
} as const

export function V2Footer({ settings, services }: V2FooterProps) {
  const brandDescription = settings?.brandDescription
    ?? 'Создаём цифровые продукты для бизнеса. Bitrix, Laravel, React, DevOps.'
  const servicesLinks: FooterLink[] = (services && services.length > 0)
    ? services.map((s) => ({ label: s.title, href: `/uslugi/${s.slug}` }))
    : (settings?.servicesLinks?.length ? settings.servicesLinks : DEFAULT_SERVICES)
  const companyLinks  = settings?.companyLinks?.length  ? settings.companyLinks  : DEFAULT_COMPANY
  const contactEmail  = settings?.contactEmail  ?? 'company@wdynasty.ru'
  const contactHours  = settings?.contactHours  ?? 'Пн–Пт: 9:00–19:00'
  const copyrightText = settings?.copyrightText ?? '© 2026 WebDynasty'
  const copyrightNote = settings?.copyrightNote ?? 'Политика конфиденциальности'

  return (
    <Box as="footer" bg="#111" color="#a0a0a0" px="5%" pt="70px" pb="40px" style={{ fontFamily: 'var(--font-manrope, Manrope, sans-serif)' }}>
      <Container maxW="1320px" px={0}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={{ base: 10, lg: 12 }} mb="60px">
          {/* Brand */}
          <VStack align="start" gap={3}>
            <Link href="/" aria-label="WebDynasty — на главную" style={{ textDecoration: 'none' }}>
              <Text fontSize="24px" fontWeight="900" letterSpacing="-1px" style={gradText}>
                WebDynasty
              </Text>
            </Link>
            <Text fontSize="14px" lineHeight="1.7" color="#999" whiteSpace="pre-line">
              {brandDescription}
            </Text>
          </VStack>

          {/* Services */}
          <VStack align="start" gap={2.5}>
            <Text fontSize="14px" fontWeight="700" color="#fff" letterSpacing="1px" textTransform="uppercase" mb={2}>Услуги</Text>
            {servicesLinks.map((l) => (
              <Link key={l.label} href={l.href} style={{ textDecoration: 'none' }}>
                <Box {...linkStyle}>{l.label}</Box>
              </Link>
            ))}
          </VStack>

          {/* Company */}
          <VStack align="start" gap={2.5}>
            <Text fontSize="14px" fontWeight="700" color="#fff" letterSpacing="1px" textTransform="uppercase" mb={2}>Компания</Text>
            {companyLinks.map((l) => (
              <Link key={l.label} href={l.href} style={{ textDecoration: 'none' }}>
                <Box {...linkStyle}>{l.label}</Box>
              </Link>
            ))}
          </VStack>

          {/* Contacts */}
          <VStack align="start" gap={2.5}>
            <Text fontSize="14px" fontWeight="700" color="#fff" letterSpacing="1px" textTransform="uppercase" mb={2}>Контакты</Text>
            <Link href={`mailto:${contactEmail}`} style={{ textDecoration: 'none' }}>
              <Box {...linkStyle}>{contactEmail}</Box>
            </Link>
            <Text fontSize="13px" color="#999" lineHeight="1.6">{contactHours}</Text>
          </VStack>
        </SimpleGrid>

        <HStack justify="space-between" wrap="wrap" gap={2} pt="30px" style={{ borderTop: '1px solid #222' }}>
          <Text fontSize="13px" color="#999">{copyrightText}</Text>
          <Text fontSize="13px" color="#999">{copyrightNote}</Text>
        </HStack>
      </Container>
    </Box>
  )
}
