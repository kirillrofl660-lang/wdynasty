export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'

import config from '@payload-config'

import { notFound } from 'next/navigation'

import { draftMode } from 'next/headers'

import { Metadata } from 'next'

import { RefreshRouteOnSave } from './RefreshRouteOnSave'

import { Box } from '@chakra-ui/react'

import { PostContent } from '@/src/widgets/post/ui/PostContent'



interface Props {

  params: Promise<{ slug: string }>

}



export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { slug } = await params

  const { isEnabled: isDraft } = await draftMode()

  const payload = await getPayload({ config })

  

  const posts = await payload.find({

    collection: 'posts',

    where: {

      slug: { equals: slug },

      ...(isDraft ? {} : { status: { equals: 'published' } }),

    },

  })
  console.log('posts', posts, isDraft);
  

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

  const { isEnabled: isDraft } = await draftMode()

  const payload = await getPayload({ config })

  

  const posts = await payload.find({

    collection: 'posts',

    where: {

      slug: { equals: slug },

      ...(isDraft ? {} : { status: { equals: 'published' } }),

    },

  })

  

  const post = posts.docs[0]

  

  if (!post) {

    notFound()

  }



  // Related posts — по совпадающим тегам, SSR

  const currentTags = (post.tags || [])

    .map((t: any) => t.tag)

    .filter(Boolean) as string[]



  let relatedPosts: any[] = []

  if (currentTags.length > 0) {

    const result = await payload.find({

      collection: 'posts',

      where: {

        and: [

          { id: { not_equals: post.id } },

          { status: { equals: 'published' } },

          {

            'tags.tag': {

              in: currentTags,

            },

          },

        ],

      },

      limit: 3,

      sort: '-publishedAt',

    })

    relatedPosts = result.docs

  }



  return (

    <>

      {isDraft && <RefreshRouteOnSave />}

      <Box minH="100vh" bg="white">

        <PostContent post={post} relatedPosts={relatedPosts} />

      </Box>

    </>

  )

}

