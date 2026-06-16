import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  
  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
  })
  
  const post = posts.docs[0]
  
  if (!post) {
    return { title: 'Пост не найден' }
  }
  
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  
  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
  })
  
  const post = posts.docs[0]
  
  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link 
        href="/blog" 
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Назад к блогу
      </Link>
      
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag: any, i: number) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded">
                  {tag.tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {post.coverImage && typeof post.coverImage !== 'number' && post.coverImage.url && (
          <img 
            src={post.coverImage.url} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: post.content ? JSON.stringify(post.content) : '' 
          }}
        />
      </article>
    </div>
  )
}
