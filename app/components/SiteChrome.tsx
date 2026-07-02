'use client'

import { usePathname } from 'next/navigation'
import { Box } from '@chakra-ui/react/box'
import { V2Header } from '../(site)/V2Header'
import { V2Footer } from '../(site)/V2Footer'
import type { NavItem } from '@/src/widgets/navigation/model/types'

interface SiteChromeProps {
  navItems: NavItem[]
  footerSettings: any
  services?: { title: string; slug: string }[]
  children: React.ReactNode
}

// Единый каркас сайта в новом стиле (WebDynasty): шапка V2Header + подвал V2Footer.
// Главная (/) рендерит свою шапку/подвал сама (там hero на всю высоту под фикс-шапкой),
// поэтому на ней общий хром не дублируем. На остальных страницах добавляем отступ сверху
// под фиксированную шапку (72px).
export function SiteChrome({ navItems, footerSettings, services, children }: SiteChromeProps) {
  const pathname = usePathname()
  const bare = pathname === '/'

  if (bare) {
    return <main>{children}</main>
  }

  return (
    <Box className="wd-root" bg="#fafafa">
      <V2Header items={navItems} />
      <Box as="main" pt="72px">{children}</Box>
      <V2Footer settings={footerSettings} services={services} />
    </Box>
  )
}
