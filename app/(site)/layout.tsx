import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import { getPayload } from 'payload'

import config from '@payload-config'

import { Providers } from '../providers'

import { Navbar } from '@/src/widgets/navigation/ui/Navbar'

import './globals.css'



const inter = Inter({ subsets: ['latin'] })



export const metadata: Metadata = {
  title: 'Династия Разработчиков — Корпоративная разработка и веб-решения',
  description: 'Разработка на 1С-Битрикс, Laravel, React, Next.js. Highload проекты, E-commerce, DevOps. Команда с 5+ годами опыта.',
  keywords: ['1С-Битрикс', 'Битрикс24', 'Laravel', 'React', 'Next.js', 'разработка сайтов', 'веб-разработка', 'E-commerce', 'DevOps', 'корпоративный портал'],
  authors: [{ name: 'Династия Разработчиков' }],
  creator: 'Династия Разработчиков',
  publisher: 'Династия Разработчиков',
  robots: 'index, follow',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://webdynasty.ru',
    siteName: 'Династия Разработчиков',
    title: 'Династия Разработчиков — Корпоративная разработка и веб-решения',
    description: 'Разработка на 1С-Битрикс, Laravel, React, Next.js. Highload проекты, E-commerce, DevOps.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Династия Разработчиков — Корпоративная разработка',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Династия Разработчиков — Корпоративная разработка и веб-решения',
    description: 'Разработка на 1С-Битрикс, Laravel, React, Next.js. Highload проекты, E-commerce, DevOps.',
    images: ['/og-image.png'],
    creator: '@webdynasty',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}



export default async function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  const payload = await getPayload({ config })

  const navResult = await payload.find({

    collection: 'navigation',

    sort: 'order',

    where: {

      isActive: { equals: true },

    },

  })



  return (

    <html lang="ru">
      <body className={inter.className}>

        <Providers>

          <Navbar items={navResult.docs as any} />

          {children}

        </Providers>

      </body>

    </html>

  )

}

