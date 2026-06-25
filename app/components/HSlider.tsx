'use client'

import React, { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const P = '#8b5cf6'

/**
 * Бесконечный горизонтальный слайдер со стрелками по бокам.
 * Дочерние элементы задают свою ширину (flex-basis).
 * Контент рендерится в 3 копиях; при скролле к краю позиция незаметно
 * переносится на одну «копию» назад/вперёд — получается зацикливание.
 */
export function HSlider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const guard = useRef(false)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const items = React.Children.toArray(children)
  const count = items.length

  // Ширина одной копии набора (включая gap) — расстояние между одинаковыми
  // элементами соседних копий.
  const period = () => {
    const el = ref.current
    if (!el || count === 0) return 0
    const first = el.children[0] as HTMLElement | undefined
    const mid = el.children[count] as HTMLElement | undefined
    if (!first || !mid) return 0
    return mid.offsetLeft - first.offsetLeft
  }

  // Стартуем в середине (вторая копия), чтобы был запас в обе стороны.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const id = requestAnimationFrame(() => {
      const p = period()
      if (p > 0) el.scrollLeft = p
    })
    return () => {
      cancelAnimationFrame(id)
      if (settleTimer.current) clearTimeout(settleTimer.current)
    }
  }, [count])

  // Перенос на одну копию делаем ТОЛЬКО когда скролл остановился, иначе
  // мгновенный сдвиг scrollLeft дерётся с плавной анимацией (вправо ломалось).
  const normalize = () => {
    const el = ref.current
    if (!el) return
    const p = period()
    if (p <= 0) return
    let x = el.scrollLeft
    if (x < p * 0.5) x += p
    else if (x > p * 1.5) x -= p
    if (x !== el.scrollLeft) {
      guard.current = true
      el.scrollLeft = x
      guard.current = false
    }
  }

  const onScroll = () => {
    if (guard.current) return
    if (settleTimer.current) clearTimeout(settleTimer.current)
    settleTimer.current = setTimeout(normalize, 120)
  }

  const scroll = (dir: number) => {
    const el = ref.current
    if (!el) return
    // Шаг = ширина одного элемента + gap (расстояние между соседними).
    const a = el.children[0] as HTMLElement | undefined
    const b = el.children[1] as HTMLElement | undefined
    const step = a && b ? b.offsetLeft - a.offsetLeft : el.clientWidth * 0.7
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
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
        onScroll={onScroll}
        className="wd-slider"
        display="flex"
        alignItems="stretch"
        gap={6}
        overflowX="auto"
        py={3}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {count > 0
          ? [0, 1, 2].map((c) =>
              items.map((child, i) => <React.Fragment key={`${c}-${i}`}>{child}</React.Fragment>),
            )
          : children}
      </Box>
    </Box>
  )
}
