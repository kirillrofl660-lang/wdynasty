import type { Metadata } from 'next'
import Script from 'next/script'
import { Manrope, Philosopher, Yeseva_One } from 'next/font/google'

import { getPayload } from 'payload'

import config from '@payload-config'

import { Providers } from '../providers'

import { SiteChrome } from '../components/SiteChrome'
import { CookieConsent } from '../components/CookieConsent'

import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})
const philosopher = Philosopher({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-philosopher',
  display: 'swap',
})
const yesevaOne = Yeseva_One({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-yeseva',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wdynasty.ru'),
  title: 'WebDynasty — Корпоративная разработка и веб-решения',
  description: 'Разработка на 1С-Битрикс, Laravel, React, Next.js. Highload проекты, E-commerce, DevOps. Команда с 5+ годами опыта.',
  keywords: ['1С-Битрикс', 'Битрикс24', 'Laravel', 'React', 'Next.js', 'разработка сайтов', 'веб-разработка', 'E-commerce', 'DevOps', 'корпоративный портал'],
  authors: [{ name: 'WebDynasty' }],
  creator: 'WebDynasty',
  publisher: 'WebDynasty',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://wdynasty.ru',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://wdynasty.ru',
    siteName: 'WebDynasty',
    title: 'WebDynasty — Корпоративная разработка и веб-решения',
    description: 'Разработка на 1С-Битрикс, Laravel, React, Next.js. Highload проекты, E-commerce, DevOps.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'WebDynasty — Корпоративная разработка',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebDynasty — Корпоративная разработка и веб-решения',
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

  const [navResult, footerSettings, servicesResult] = await Promise.all([
    payload.find({
      collection: 'navigation',
      sort: 'order',
      where: { isActive: { equals: true } },
    }),
    payload.findGlobal({ slug: 'footer' }).catch(() => null),
    payload
      .find({ collection: 'services', where: { status: { equals: 'published' } }, sort: 'order', limit: 8 })
      .catch(() => ({ docs: [] as any[] })),
  ])

  const footerServices = (servicesResult.docs as any[]).map((s) => ({ title: s.title, slug: s.slug }))

  return (

    <html lang="ru" className={`${manrope.variable} ${philosopher.variable} ${yesevaOne.variable}`}>
      <body className={manrope.className}>
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
        >{`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();
          for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
          ym(109964523,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
        `}</Script>
        <Providers>
          <SiteChrome navItems={navResult.docs as any} footerSettings={footerSettings} services={footerServices}>
            {children}
          </SiteChrome>
        </Providers>
        <CookieConsent />
      </body>
    </html>

  )

}

