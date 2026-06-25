'use client'

import { useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const P = '#8b5cf6'

/** Горизонтальный слайдер со стрелками по бокам. Дочерние элементы задают свою ширину. */
export function HSlider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <Box position="relative">
      {[
        { d: -1, Icon: ChevronLeft, pos: { left: { base: '2px', xl: '-18px' } } },
        { d: 1, Icon: ChevronRight, pos: { right: { base: '2px', xl: '-18px' } } },
      ].map(({ d, Icon, pos }) => (
        <Box
          key={d}
          as="button"
          aria-label={d < 0 ? 'Назад' : 'Вперёд'}
          onClick={() => scroll(d)}
          position="absolute"
          top="50%"
          zIndex={3}
          {...pos}
          style={{ transform: 'translateY(-50%)' }}
          w="48px"
          h="48px"
          borderRadius="999px"
          bg="white"
          border="1px solid #e2e2e2"
          display={{ base: 'none', md: 'flex' }}
          alignItems="center"
          justifyContent="center"
          color="#111"
          boxShadow="0 6px 24px rgba(0,0,0,.14)"
          transition="all .2s"
          _hover={{ borderColor: P, color: P }}
        >
          <Icon size={22} />
        </Box>
      ))}

      <Box
        ref={ref}
        className="wd-slider"
        display="flex"
        alignItems="stretch"
        gap={6}
        overflowX="auto"
        py={3}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {children}
      </Box>
    </Box>
  )
}
