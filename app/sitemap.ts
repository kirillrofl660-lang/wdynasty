import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wdynasty.ru'

  // Статичные страницы
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Посты блога
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const payload = await getPayload({ config })
    const posts = await payload.find({
      collection: 'posts',
      where: {
        status: { equals: 'published' },
      },
      limit: 1000,
    })

    blogPosts = posts.docs.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Если Payload недоступен — возвращаем только статичные
  }

  return [...staticPages, ...blogPosts]
}
