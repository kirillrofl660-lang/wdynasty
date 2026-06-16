import { PostsResponse } from './types'

export async function fetchPosts(
  page: number,
  tag: string,
  search: string,
): Promise<PostsResponse> {
  const params = new URLSearchParams()
  params.set('page', String(page))
  params.set('limit', '9')
  if (tag !== 'all') params.set('tag', tag)
  if (search) params.set('search', search)
  const res = await fetch(`/api/blog/posts?${params}`)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export async function fetchTags(): Promise<string[]> {
  const res = await fetch('/api/blog/tags')
  if (!res.ok) throw new Error('Failed to fetch tags')
  return res.json()
}
