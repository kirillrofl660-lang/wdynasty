import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs/promises'
import path from 'path'

const baseUrl = 'https://wdynasty.ru'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(request: Request) {
  const token = request.headers.get('x-revalidate-token') || new URL(request.url).searchParams.get('token')
  const expected = process.env.REVALIDATE_SITEMAP_TOKEN

  if (!expected) {
    return NextResponse.json({ error: 'REVALIDATE_SITEMAP_TOKEN not configured' }, { status: 500 })
  }

  if (token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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
  let fetchedCount = 0

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

    fetchedCount = posts.docs.length + services.docs.length + cases.docs.length
  } catch (err) {
    console.error('Sitemap revalidation fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch CMS data' }, { status: 500 })
  }

  const allUrls = [...staticPages, ...blogPosts, ...servicePages, ...casePages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((u) => `  <url>
    <loc>${escapeXml(u.url)}</loc>
    <lastmod>${u.lastModified.toISOString()}</lastmod>
    <changefreq>${u.changeFrequency}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  try {
    const outPath = path.join(process.cwd(), 'public', 'sitemap.xml')
    await fs.mkdir(path.dirname(outPath), { recursive: true })
    await fs.writeFile(outPath, xml, 'utf-8')
  } catch (err) {
    console.error('Sitemap write error:', err)
    return NextResponse.json({ error: 'Failed to write sitemap.xml' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, urls: allUrls.length, fetched: fetchedCount })
}
