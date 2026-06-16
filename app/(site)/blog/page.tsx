import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Блог | Web Dynasty',
  description: 'Статьи о разработке, 1С-Битрикс, Laravel, React и DevOps',
}

export default async function BlogPage() {
  const payload = await getPayload({ config })
  
  const posts = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Блог</h1>
      
      {posts.docs.length === 0 ? (
        <p className="text-gray-500">Пока нет опубликованных постов.</p>
      ) : (
        <div className="space-y-8">
          {posts.docs.map((post: any) => (
            <article key={post.id} className="border-b pb-8">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
              
              {post.excerpt && (
                <p className="text-gray-600 mb-3">{post.excerpt}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
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
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
