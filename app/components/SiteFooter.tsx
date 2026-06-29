'use client'

import {
  Box, Container, SimpleGrid, VStack, Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'

type FooterLink = { label: string; href: string }

interface FooterProps {
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
  { label: '1С-Битрикс',    href: '/#services' },
  { label: 'Laravel + React', href: '/#services' },
  { label: 'Битрикс24',     href: '/#services' },
  { label: 'DevOps',        href: '/#services' },
]

const DEFAULT_COMPANY: FooterLink[] = [
  { label: 'Блог',    href: '/blog' },
  { label: 'Команда', href: '/team' },
  { label: 'Услуги',  href: '/uslugi' },
  { label: 'FAQ',     href: '/#faq' },
]

export function SiteFooter({ settings }: FooterProps) {
  const brandDescription = settings?.brandDescription
    ?? 'Студия цифрового мастерства.\nСоздаём продукты с душой и точностью ремесленника.'
  const servicesLinks  = settings?.servicesLinks?.length  ? settings.servicesLinks  : DEFAULT_SERVICES
  const companyLinks   = settings?.companyLinks?.length   ? settings.companyLinks   : DEFAULT_COMPANY
  const contactEmail   = settings?.contactEmail   ?? 'company@wdynasty.ru'
  const contactHours   = settings?.contactHours   ?? 'Пн–Пт: 9:00–19:00'
  const copyrightText  = settings?.copyrightText  ?? '© 2026 Студия ДИНАСТИЯ. Все права защищены.'
  const copyrightNote  = settings?.copyrightNote  ?? 'Сделано с уважением к ремеслу'

  return (
    <Box as="footer" bg="#6e1420">
      <Box w="full" h="12" overflow="hidden">
        <svg style={{ width: '100%', height: '48px', display: 'block' }} preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="sf-xstitchCream" x="0" y="0" width="160" height="48" patternUnits="userSpaceOnUse">
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
          </defs>
          <rect width="100%" height="48" fill="url(#sf-xstitchCream)" />
        </svg>
      </Box>
      <Container maxW="6xl" px={{ base: 4, md: 8 }} pt={14} pb={7}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={10} mb={14}>

          {/* Brand */}
          <VStack align="start" gap={3}>
            <Text style={{ fontFamily: 'var(--font-yeseva, "Yeseva One", serif)', fontSize: '1.25rem', letterSpacing: '2px' }} color="white">
              ДИН<Text as="span" color="#f0d9bc">А</Text>СТИЯ
            </Text>
            <Text fontSize="sm" color="rgba(245,240,230,0.7)" lineHeight="1.6" whiteSpace="pre-line">
              {brandDescription}
            </Text>
          </VStack>

          {/* Services */}
          <VStack align="start" gap={3}>
            <Text style={{ fontFamily: 'var(--font-philosopher, serif)' }} color="white" fontWeight="700" mb={1}>Услуги</Text>
            {servicesLinks.map((l) => (
              <NextLink key={l.label} href={l.href}>
                <Text fontSize="sm" color="rgba(245,240,230,0.75)" _hover={{ color: 'white' }}>{l.label}</Text>
              </NextLink>
            ))}
          </VStack>

          {/* Company */}
          <VStack align="start" gap={3}>
            <Text style={{ fontFamily: 'var(--font-philosopher, serif)' }} color="white" fontWeight="700" mb={1}>Компания</Text>
            {companyLinks.map((l) => (
              <NextLink key={l.label} href={l.href}>
                <Text fontSize="sm" color="rgba(245,240,230,0.75)" _hover={{ color: 'white' }}>{l.label}</Text>
              </NextLink>
            ))}
          </VStack>

          {/* Contacts */}
          <VStack align="start" gap={2}>
            <Text style={{ fontFamily: 'var(--font-philosopher, serif)' }} color="white" fontWeight="700" mb={1}>Контакты</Text>
            <NextLink href={`mailto:${contactEmail}`}>
              <Text fontSize="sm" color="rgba(245,240,230,0.75)" _hover={{ color: 'white' }}>{contactEmail}</Text>
            </NextLink>
            <Text fontSize="xs" color="rgba(245,240,230,0.6)" lineHeight="1.6" mt={1}>{contactHours}</Text>
          </VStack>

        </SimpleGrid>
        <Box style={{ borderTop: '1px solid rgba(245,240,230,0.15)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <Text fontSize="xs" color="rgba(245,240,230,0.5)">{copyrightText}</Text>
          <Text fontSize="xs" color="rgba(245,240,230,0.5)">{copyrightNote}</Text>
        </Box>
      </Container>
    </Box>
  )
}
