import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_PATHS = [
  '/',
  '/uslugi',
  '/cases',
  '/team',
  '/blog',
  '/uslugi/[slug]',
  '/cases/[slug]',
  '/team/[slug]',
  '/blog/[slug]',
]

export async function POST(request: NextRequest) {
  const token = process.env.REVALIDATE_SITEMAP_TOKEN || process.env.REVALIDATE_TOKEN
  const authHeader = request.headers.get('authorization')?.replace('Bearer ', '')
  const body = (await request.json().catch(() => ({}))) as { paths?: string[]; token?: string }

  if (body.token !== token && authHeader !== token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const paths = body.paths?.length ? body.paths : DEFAULT_PATHS
  const results: { path: string; ok: boolean }[] = []

  for (const path of paths) {
    try {
      revalidatePath(path)
      results.push({ path, ok: true })
    } catch (err) {
      console.error(`[revalidate] failed ${path}:`, err)
      results.push({ path, ok: false })
    }
  }

  return NextResponse.json({ ok: true, revalidated: results })
}
