import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export const revalidate = 43200

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wdynasty.ru'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/blog`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${baseUrl}/cases`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/team`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/uslugi`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  let blogPosts: MetadataRoute.Sitemap = []
  let servicePages: MetadataRoute.Sitemap = []
  let casePages: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload({ config })

    const [posts, services, cases] = await Promise.all([
      payload.find({ collection: 'posts',    where: { status: { equals: 'published' } }, limit: 1000 }),
      payload.find({ collection: 'services', where: { status: { equals: 'published' } }, limit: 200  }),
      payload.find({ collection: 'cases',    where: { status: { equals: 'published' } }, limit: 200  }),
    ])

    blogPosts = posts.docs.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    servicePages = services.docs.map((s: any) => ({
      url: `${baseUrl}/uslugi/${s.slug}`,
      lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    casePages = cases.docs.map((c: any) => ({
      url: `${baseUrl}/cases/${c.slug}`,
      lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  } catch {
    // Payload недоступен при сборке без БД — возвращаем только статику
  }

  return [...staticPages, ...blogPosts, ...servicePages, ...casePages]
}
