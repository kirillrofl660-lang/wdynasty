import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '9')
  const tag = searchParams.get('tag')
  const search = searchParams.get('search')

  const payload = await getPayload({ config })

  const where: any = {
    status: { equals: 'published' },
  }

  if (tag && tag !== 'all') {
    where['tags.tag'] = { equals: tag }
  }

  if (search) {
    where.title = { contains: search }
  }

  const result = await payload.find({
    collection: 'posts',
    where,
    limit,
    page,
    sort: '-publishedAt',
  })

  return NextResponse.json({
    docs: result.docs,
    totalPages: result.totalPages,
    totalDocs: result.totalDocs,
    page: result.page,
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
  })
}
