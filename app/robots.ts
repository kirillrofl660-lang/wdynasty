import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/(payload)/'],
    },
    sitemap: 'https://wdynasty.ru/sitemap.xml',
    host: 'https://wdynasty.ru',
  }
}
