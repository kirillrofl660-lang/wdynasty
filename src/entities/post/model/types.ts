export interface Post {
  id: number | string
  title: string
  slug: string
  excerpt?: string | null
  content?: any
  coverImage?: any
  publishedAt?: string | null
  tags?: Array<{ tag?: string | null; id?: string | null }> | null
}

export interface RelatedPost {
  id: string | number
  title: string
  slug: string
  publishedAt?: string | null
  coverImage?: any
}
