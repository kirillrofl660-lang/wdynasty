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
      bg="brand.950"
      position="sticky"
      top={0}
      zIndex="sticky"
      suppressHydrationWarning
      overflow="hidden"
    >
      {/* Голубое свечение справа как в Hero */}
      <Box
        position="absolute"
        top="0"
        right="0"
        w="50%"
        h="full"
        bg="brand.500"
        opacity="0.15"
        style={{ filter: 'blur(80px)' }}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="-50%"
        right="10%"
        w="300px"
        h="300px"
        bg="brand.400"
        opacity="0.1"
        borderRadius="full"
        style={{ filter: 'blur(60px)' }}
        pointerEvents="none"
      />
      <Container maxW="6xl" px={4} position="relative">
        <HStack justify="space-between" h={14}>
          {/* Лого как в Hero */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <HStack gap={1} align="baseline">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="white"
                letterSpacing="tight"
              >
                Династия
              </Text>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="brand.500"
                letterSpacing="tight"
              >
                Разработчиков
              </Text>
            </HStack>
          </Link>

          {/* Десктоп-меню */}
          <HStack gap={1} display={{ base: 'none', md: 'flex' }}>
            {sorted.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
              const itemStyle = {
                px: 3,
                py: 1.5,
                borderRadius: 'md',
                fontSize: 'sm',
                fontWeight: 'medium',
                color: isActive ? 'accent.400' : 'whiteAlpha.800',
                bg: isActive ? 'whiteAlpha.100' : 'transparent',
                transition: 'all 0.2s',
                textDecoration: 'none',
                _hover: { color: 'white', bg: 'whiteAlpha.100' },
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
                  <Box {...itemStyle}>
                    {item.label}
                  </Box>
                </Link>
              )
            })}
          </HStack>

          {/* Бургер на мобиле */}
          <Button
            variant="ghost"
            color="white"
            size="sm"
            display={{ base: 'flex', md: 'none' }}
            onClick={() => setMobileOpen((o) => !o)}
            px={2}
          >
            <Icon as={mobileOpen ? X : Menu} w={5} h={5} />
          </Button>
        </HStack>

        {/* Мобильное меню */}
        {mobileOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <VStack align="stretch" gap={1}>
              {sorted.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                const mobileStyle = {
                  px: 3,
                  py: 2,
                  borderRadius: 'md',
                  fontSize: 'sm',
                  fontWeight: 'medium',
                  color: isActive ? 'accent.400' : 'whiteAlpha.800',
                  bg: isActive ? 'whiteAlpha.100' : 'transparent',
                  _hover: { color: 'white', bg: 'whiteAlpha.100' },
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
                    <Box {...mobileStyle}>
                      {item.label}
                    </Box>
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
