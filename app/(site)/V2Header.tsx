'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { chakra } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react/box'
import { HStack, VStack } from '@chakra-ui/react/stack'
import { Text } from '@chakra-ui/react/text'
import { Menu, X } from 'lucide-react'
import type { NavItem } from '@/src/widgets/navigation/model/types'

const GRAD = 'linear-gradient(90deg, #6b21d4, #be1860)'
const gradText = {
  color: '#6b21d4',
  background: GRAD,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
} as const

export function V2Header({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const sorted = [...items]
    .filter((i) => i.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const linkStyle = {
    color: '#555',
    fontWeight: '500',
    fontSize: '15px',
    textDecoration: 'none',
    transition: 'color .2s',
    _hover: { color: '#111' },
  } as const

  const renderLink = (item: NavItem, onClick?: () => void) =>
    item.isExternal ? (
      <chakra.a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick} {...linkStyle}>
        {item.label}
      </chakra.a>
    ) : (
      <Link key={item.id} href={item.href} onClick={onClick} style={{ textDecoration: 'none' }}>
        <Box {...linkStyle}>{item.label}</Box>
      </Link>
    )

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      h="72px"
      px="5%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      style={{
        background: 'rgba(250,250,250,.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,.06)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,.07)' : 'none',
        transition: 'box-shadow .3s',
        fontFamily: 'var(--font-manrope, Manrope, sans-serif)',
      }}
    >
      {/* Логотип */}
      <Link href="/" aria-label="WebDynasty — на главную" style={{ textDecoration: 'none' }}>
        <Text fontWeight="900" fontSize="22px" letterSpacing="-1px" style={gradText}>
          WebDynasty
        </Text>
      </Link>

      {/* Десктоп-меню */}
      <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
        {sorted.map((item) => renderLink(item))}
      </HStack>

      {/* CTA + бургер */}
      <HStack gap={3}>
        <Link href="#cta" style={{ textDecoration: 'none' }}>
          <Box
            display={{ base: 'none', sm: 'inline-block' }}
            px="22px"
            py="10px"
            borderRadius="999px"
            color="white"
            fontWeight="700"
            fontSize="14px"
            whiteSpace="nowrap"
            style={{ background: GRAD }}
            _hover={{ opacity: 0.9 }}
          >
            Обсудить проект
          </Box>
        </Link>
        <Box
          as="button"
          display={{ base: 'flex', md: 'none' }}
          alignItems="center"
          justifyContent="center"
          p={1}
          color="#111"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </Box>
      </HStack>

      {/* Мобильное меню */}
      {open && (
        <Box
          position="absolute"
          top="72px"
          left={0}
          right={0}
          px="5%"
          py={4}
          display={{ md: 'none' }}
          style={{ background: 'rgba(250,250,250,.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,.06)' }}
        >
          <VStack align="stretch" gap={3}>
            {sorted.map((item) => renderLink(item, () => setOpen(false)))}
            <Link href="#cta" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
              <Box px="22px" py="12px" borderRadius="999px" color="white" fontWeight="700" fontSize="14px" textAlign="center" style={{ background: GRAD }}>
                Обсудить проект
              </Box>
            </Link>
          </VStack>
        </Box>
      )}
    </Box>
  )
}
