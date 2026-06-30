import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs/promises'
import path from 'path'

const baseUrl = 'https://wdynasty.ru'

async function generateSitemap() {
  const staticPages = [
    { url: baseUrl,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/blog`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${baseUrl}/cases`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/team`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/uslugi`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  let blogPosts: any[] = []
  let servicePages: any[] = []
  let casePages: any[] = []

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
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

    servicePages = services.docs.map((s: any) => ({
      url: `${baseUrl}/uslugi/${s.slug}`,
      lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    casePages = cases.docs.map((c: any) => ({
      url: `${baseUrl}/cases/${c.slug}`,
      lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    }))
  } catch (err) {
    console.warn('Failed to fetch dynamic content for sitemap:', err)
  }

  const allUrls = [...staticPages, ...blogPosts, ...servicePages, ...casePages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastModified.toISOString()}</lastmod>
    <changefreq>${u.changeFrequency}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  const outPath = path.join(process.cwd(), 'public', 'sitemap.xml')
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, xml, 'utf-8')
  console.log(`Sitemap generated: ${outPath} (${allUrls.length} URLs)`)
}

generateSitemap().catch((err) => {
  console.error('Sitemap generation failed:', err)
  process.exit(1)
})
