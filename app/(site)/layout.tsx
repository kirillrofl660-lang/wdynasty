import type { Metadata } from 'next'
import Script from 'next/script'

import { getPayload } from 'payload'

import config from '@payload-config'

import { Providers } from '../providers'

import { Navbar } from '@/src/widgets/navigation/ui/Navbar'

import './globals.css'






export const metadata: Metadata = {
  title: 'Династия Разработчиков — Корпоративная разработка и веб-решения',
  description: 'Разработка на 1С-Битрикс, Laravel, React, Next.js. Highload проекты, E-commerce, DevOps. Команда с 5+ годами опыта.',
  keywords: ['1С-Битрикс', 'Битрикс24', 'Laravel', 'React', 'Next.js', 'разработка сайтов', 'веб-разработка', 'E-commerce', 'DevOps', 'корпоративный портал'],
  authors: [{ name: 'Династия Разработчиков' }],
  creator: 'Династия Разработчиков',
  publisher: 'Династия Разработчиков',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://wdynasty.ru',
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://wdynasty.ru',
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
    yandex: '2d6b1c0472164d16',
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
      <body>
        <Providers>
          <Navbar items={navResult.docs as any} />
          <main>{children}</main>
        </Providers>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=109964523', 'ym');
          ym(109964523, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/109964523" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
      </body>
    </html>

  )

}

