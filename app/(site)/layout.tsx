import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Providers } from '../providers'
import { Navbar } from '@/src/widgets/navigation/ui/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Developer Portfolio | Next.js + Payload CMS + Chakra UI',
  description: 'A modern developer portfolio built with Next.js, Payload CMS, and Chakra UI',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let navItems: any[] = []
  try {
    const payload = await getPayload({ config })
    const navResult = await payload.find({
      collection: 'navigation',
      sort: 'order',
      where: {
        isActive: { equals: true },
      },
    })
    navItems = navResult.docs
  } catch {
    // База ещё не создана (во время билда) — используем дефолтное меню
    navItems = [
      { id: 1, label: 'Главная', href: '/', order: 0, isActive: true },
      { id: 2, label: 'Блог', href: '/blog', order: 1, isActive: true },
    ]
  }

  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <Providers>
          <Navbar items={navItems} />
          {children}
        </Providers>
      </body>
    </html>
  )
}
