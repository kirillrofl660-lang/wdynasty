export const revalidate = 300

import { getPayload } from 'payload'

import config from '@payload-config'

import { Metadata } from 'next'

import { Box } from '@chakra-ui/react/box'

import { BlogGrid } from '@/src/widgets/blog/ui/BlogGrid'



export const metadata: Metadata = {

  title: 'Блог | WebDynasty',

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

    <Box minH="100vh" bg="#fafafa">

      <BlogGrid initialPosts={result.docs} initialTotalPages={result.totalPages} />

    </Box>

  )

}

