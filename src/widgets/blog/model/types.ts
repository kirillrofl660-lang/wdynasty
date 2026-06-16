import { Post } from '@/src/entities/post/model'

export interface PostsResponse {
  docs: Post[]
  totalPages: number
  totalDocs: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface BlogGridProps {
  initialPosts: Post[]
  initialTotalPages: number
}
