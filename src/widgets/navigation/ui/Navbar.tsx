'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import {
  Box,
  HStack,
  Text,
  Button,
  Container,
  Icon,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { NavItem } from '../model/types'

interface NavbarProps {
  items: NavItem[]
}

export function Navbar({ items }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const sorted = [...items]
    .filter((i) => i.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <Box
      as="header"
      bg="rgba(245,240,230,0.96)"
      position="sticky"
      top={0}
      zIndex="sticky"
      suppressHydrationWarning
      style={{ backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(139,28,44,0.14)', boxShadow: '0 1px 14px rgba(26,15,10,0.05)' }}
    >
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <HStack justify="space-between" h={14}>
          {/* Логотип */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Text
              style={{ fontFamily: 'var(--font-yeseva, "Yeseva One", serif)', fontSize: '1.3rem', letterSpacing: '2px', color: '#1a0f0a' }}
            >
              ДИН<Text as="span" color="brand.500">А</Text>СТИЯ
            </Text>
          </Link>

          {/* Десктоп-меню */}
          <HStack gap={1} display={{ base: 'none', md: 'flex' }}>
            {sorted.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
              const itemStyle = {
                px: 3,
                py: 1.5,
                fontSize: 'sm',
                fontWeight: '600',
                letterSpacing: '0.06em',
                textTransform: 'uppercase' as const,
                color: isActive ? 'brand.500' : '#7a6050',
                transition: 'color 0.2s',
                textDecoration: 'none',
                _hover: { color: 'brand.500' },
              }
              if (item.isExternal) {
                return (
                  <chakra.a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" {...itemStyle}>
                    {item.label}
                  </chakra.a>
                )
              }
              return (
                <Link key={item.id} href={item.href} style={{ textDecoration: 'none' }}>
                  <Box {...itemStyle}>{item.label}</Box>
                </Link>
              )
            })}
            <Link href="#cta" style={{ textDecoration: 'none' }}>
              <Box
                bg="brand.500" color="white" px={5} py={2} borderRadius="2px"
                fontSize="xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase"
                _hover={{ bg: 'brand.600' }} transition="background 0.2s"
              >
                Связаться
              </Box>
            </Link>
          </HStack>

          {/* Бургер на мобиле */}
          <Button
            variant="ghost"
            color="#1a0f0a"
            size="sm"
            display={{ base: 'flex', md: 'none' }}
            onClick={() => setMobileOpen((o) => !o)}
            px={2}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileOpen}
          >
            <Icon as={mobileOpen ? X : Menu} w={5} h={5} />
          </Button>
        </HStack>

        {/* Мобильное меню */}
        {mobileOpen && (
          <Box pb={4} display={{ md: 'none' }} style={{ borderTop: '1px solid rgba(139,28,44,0.1)' }} pt={3}>
            <VStack align="stretch" gap={1}>
              {sorted.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                const mobileStyle = {
                  px: 3,
                  py: 2,
                  fontSize: 'sm',
                  fontWeight: '600',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                  color: isActive ? 'brand.500' : '#7a6050',
                  _hover: { color: 'brand.500' },
                  textDecoration: 'none',
                  onClick: () => setMobileOpen(false),
                }
                if (item.isExternal) {
                  return (
                    <chakra.a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" {...mobileStyle}>
                      {item.label}
                    </chakra.a>
                  )
                }
                return (
                  <Link key={item.id} href={item.href} style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
                    <Box {...mobileStyle}>{item.label}</Box>
                  </Link>
                )
              })}
            </VStack>
          </Box>
        )}
      </Container>
    </Box>
  )
}
