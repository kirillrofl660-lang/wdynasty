import { getPayload } from 'payload'
import config from '@payload-config'
import { Metadata } from 'next'
import { Box } from '@chakra-ui/react'
import { BlogGrid } from '@/src/widgets/blog/ui/BlogGrid'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Блог | Web Dynasty',
  description: 'Статьи о разработке, 1С-Битрикс, Laravel, React и DevOps',
}

export default async function BlogPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 9,
    page: 1,
    sort: '-publishedAt',
  })

  return (
    <Box minH="100vh" bg="white">
      <BlogGrid initialPosts={result.docs} initialTotalPages={result.totalPages} />
    </Box>
  )
}
