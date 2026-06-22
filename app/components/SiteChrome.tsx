'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/src/widgets/navigation/ui/Navbar'
import { SiteFooter } from './SiteFooter'
import type { NavItem } from '@/src/widgets/navigation/model/types'

interface SiteChromeProps {
  navItems: NavItem[]
  footerSettings: any
  children: React.ReactNode
}

// Оборачивает контент сайта общими шапкой/подвалом.
// На /v2 общий «народный» хром скрыт — у этой страницы своя шапка/подвал (V2Header/V2Footer).
export function SiteChrome({ navItems, footerSettings, children }: SiteChromeProps) {
  const pathname = usePathname()
  const bare = pathname === '/v2' || pathname?.startsWith('/v2/')

  if (bare) {
    return <main>{children}</main>
  }

  return (
    <>
      <Navbar items={navItems} />
      <main>{children}</main>
      <SiteFooter settings={footerSettings} />
    </>
  )
}
