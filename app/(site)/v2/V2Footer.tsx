'use client'

import { Box, Container, SimpleGrid, VStack, HStack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

const GRAD = 'linear-gradient(90deg, #8b5cf6, #ec4899)'
const gradText = {
  background: GRAD,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
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
}

const DEFAULT_SERVICES: FooterLink[] = [
  { label: '1С-Битрикс',      href: '/v2#services' },
  { label: 'Laravel + React', href: '/v2#services' },
  { label: 'Битрикс24',       href: '/v2#services' },
  { label: 'DevOps',          href: '/v2#services' },
]

const DEFAULT_COMPANY: FooterLink[] = [
  { label: 'О нас',     href: '/v2#whyus' },
  { label: 'Команда',   href: '/team' },
  { label: 'Портфолио', href: '/uslugi' },
  { label: 'Блог',      href: '/blog' },
]

const linkStyle = {
  fontSize: '14px',
  color: '#666',
  textDecoration: 'none',
  transition: 'color .2s',
  _hover: { color: '#fff' },
} as const

export function V2Footer({ settings }: V2FooterProps) {
  const brandDescription = settings?.brandDescription
    ?? 'Создаём цифровые продукты для бизнеса. Bitrix, Laravel, React, DevOps.'
  const servicesLinks = settings?.servicesLinks?.length ? settings.servicesLinks : DEFAULT_SERVICES
  const companyLinks  = settings?.companyLinks?.length  ? settings.companyLinks  : DEFAULT_COMPANY
  const contactEmail  = settings?.contactEmail  ?? 'hello@wdynasty.ru'
  const contactHours  = settings?.contactHours  ?? 'Пн–Пт: 9:00–19:00'
  const copyrightText = settings?.copyrightText ?? '© 2026 WebDynasty'
  const copyrightNote = settings?.copyrightNote ?? 'Политика конфиденциальности'

  return (
    <Box as="footer" bg="#111" color="#777" px="5%" pt="70px" pb="40px" style={{ fontFamily: 'var(--font-manrope, Manrope, sans-serif)' }}>
      <Container maxW="1320px" px={0}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={{ base: 10, lg: 12 }} mb="60px">
          {/* Brand */}
          <VStack align="start" gap={3}>
            <Text fontSize="24px" fontWeight="900" letterSpacing="-1px" style={gradText}>
              WebDynasty
            </Text>
            <Text fontSize="14px" lineHeight="1.7" color="#666" whiteSpace="pre-line">
              {brandDescription}
            </Text>
          </VStack>

          {/* Services */}
          <VStack align="start" gap={2.5}>
            <Text fontSize="14px" fontWeight="700" color="#fff" letterSpacing="1px" textTransform="uppercase" mb={2}>Услуги</Text>
            {servicesLinks.map((l) => (
              <NextLink key={l.label} href={l.href} style={{ textDecoration: 'none' }}>
                <Box {...linkStyle}>{l.label}</Box>
              </NextLink>
            ))}
          </VStack>

          {/* Company */}
          <VStack align="start" gap={2.5}>
            <Text fontSize="14px" fontWeight="700" color="#fff" letterSpacing="1px" textTransform="uppercase" mb={2}>Компания</Text>
            {companyLinks.map((l) => (
              <NextLink key={l.label} href={l.href} style={{ textDecoration: 'none' }}>
                <Box {...linkStyle}>{l.label}</Box>
              </NextLink>
            ))}
          </VStack>

          {/* Contacts */}
          <VStack align="start" gap={2.5}>
            <Text fontSize="14px" fontWeight="700" color="#fff" letterSpacing="1px" textTransform="uppercase" mb={2}>Контакты</Text>
            <NextLink href={`mailto:${contactEmail}`} style={{ textDecoration: 'none' }}>
              <Box {...linkStyle}>{contactEmail}</Box>
            </NextLink>
            <Text fontSize="13px" color="#555" lineHeight="1.6">{contactHours}</Text>
          </VStack>
        </SimpleGrid>

        <HStack justify="space-between" wrap="wrap" gap={2} pt="30px" style={{ borderTop: '1px solid #222' }}>
          <Text fontSize="13px" color="#666">{copyrightText}</Text>
          <Text fontSize="13px" color="#666">{copyrightNote}</Text>
        </HStack>
      </Container>
    </Box>
  )
}
