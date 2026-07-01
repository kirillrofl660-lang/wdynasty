'use client'

import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { Box } from '@chakra-ui/react/box'
import { VStack, HStack } from '@chakra-ui/react/stack'
import { Text } from '@chakra-ui/react/text'
import { Heading } from '@chakra-ui/react/heading'
import { Image } from '@chakra-ui/react/image'
import { Icon } from '@chakra-ui/react/icon'
import { Center } from '@chakra-ui/react/center'
import { Post } from '@/src/entities/post/model'
import { formatDate } from '@/src/shared/lib/formatDate'

interface BlogCardProps {
  post: Post
  index: number
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.publishedAt ? formatDate(post.publishedAt) : ''

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', height: '100%' }}>
      <Box
        bg="white"
        style={{ border: '1px solid rgba(0,0,0,0.07)', borderRadius: '24px', overflow: 'hidden', height: '100%', transition: 'transform 0.3s, box-shadow 0.3s' }}
        _hover={{ transform: 'translateY(-6px)', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
        css={{ '&:hover .blog-card-img': { transform: 'scale(1.05)' } }}
      >
        <Box position="relative" h={48} overflow="hidden" bg="#f3f3f6">
          {post.coverImage && post.coverImage.url ? (
            <Image
              className="blog-card-img"
              src={post.coverImage.url}
              alt={post.title}
              w="full"
              h="full"
              objectFit="cover"
              transition="transform 0.5s ease"
            />
          ) : (
            <Center
              className="blog-card-img"
              w="full"
              h="full"
              style={{ background: 'linear-gradient(135deg, #6b21d4, #be1860)' }}
              transition="transform 0.5s ease"
            >
              <Text fontSize="6xl" fontWeight="900" color="rgba(255,255,255,0.85)">
                {post.title.charAt(0)}
              </Text>
            </Center>
          )}
        </Box>

        <Box p={6}>
          <VStack align="start" gap={3} h="full">
            {post.tags && post.tags.length > 0 && (
              <HStack gap={2} wrap="wrap">
                {post.tags.slice(0, 3).map((tag, i) =>
                  tag.tag ? (
                    <Text key={i} fontSize="xs" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" color="#6b21d4">
                      {tag.tag}
                    </Text>
                  ) : null,
                )}
              </HStack>
            )}

            <Heading
              as="h3"
              fontSize="xl"
              fontWeight="800"
              letterSpacing="-0.02em"
              color="#111"
              lineHeight="short"
              transition="color 0.2s"
            >
              {post.title}
            </Heading>

            {post.excerpt && (
              <Text
                color="#666"
                fontSize="sm"
                lineHeight="relaxed"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {post.excerpt}
              </Text>
            )}

            <HStack justify="space-between" w="full" pt={3} mt="auto" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              {post.publishedAt && (
                <HStack gap={1} fontSize="xs" color="#757575">
                  <Icon as={Calendar} w={3.5} h={3.5} />
                  <Text suppressHydrationWarning>{formattedDate}</Text>
                </HStack>
              )}
              <HStack gap={1} fontSize="sm" fontWeight="700" color="#6b21d4">
                <Text>Смотреть</Text>
                <Icon as={ArrowRight} w={4} h={4} />
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Link>
  )
}
