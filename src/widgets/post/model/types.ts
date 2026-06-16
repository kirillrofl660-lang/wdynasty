import { Post, RelatedPost } from '@/src/entities/post/model'

export interface PostContentProps {
  post: Post
  relatedPosts?: RelatedPost[]
}
