import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit: 999,
    sort: '-publishedAt',
  })

  const tags = new Set<string>()
  result.docs.forEach((post: any) => {
    post.tags?.forEach((t: any) => {
      if (t.tag) tags.add(t.tag)
    })
  })

  return NextResponse.json(Array.from(tags).sort())
}
