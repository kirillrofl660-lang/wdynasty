'use client'

import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  Icon,
  Center,
} from '@chakra-ui/react'
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
        style={{ border: '1.5px solid rgba(139,28,44,0.12)', borderRadius: '4px', overflow: 'hidden', height: '100%', transition: 'transform 0.25s, box-shadow 0.25s' }}
        _hover={{ transform: 'translateY(-4px)', boxShadow: '0 16px 40px rgba(139,28,44,0.15)' }}
        css={{ '&:hover .blog-card-img': { transform: 'scale(1.05)' } }}
      >
        <Box position="relative" h={48} overflow="hidden" bg="#ede7d6">
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
              style={{ background: 'linear-gradient(150deg, #8b1c2c, #6e1420)' }}
              transition="transform 0.5s ease"
            >
              <Text fontSize="6xl" style={{ fontFamily: 'var(--font-yeseva, serif)' }} color="rgba(245,240,230,0.25)">
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
                    <Text key={i} fontSize="xs" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" color="#b8852a">
                      {tag.tag}
                    </Text>
                  ) : null,
                )}
              </HStack>
            )}

            <Heading
              as="h3"
              style={{ fontFamily: 'var(--font-philosopher, serif)' }}
              fontSize="xl"
              fontWeight="700"
              color="#1a0f0a"
              lineHeight="short"
              transition="color 0.2s"
            >
              {post.title}
            </Heading>

            {post.excerpt && (
              <Text
                color="#7a6050"
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

            <HStack justify="space-between" w="full" pt={3} mt="auto" style={{ borderTop: '1px solid rgba(139,28,44,0.1)' }}>
              {post.publishedAt && (
                <HStack gap={1} fontSize="xs" color="#7a6050">
                  <Icon as={Calendar} w={3.5} h={3.5} />
                  <Text suppressHydrationWarning>{formattedDate}</Text>
                </HStack>
              )}
              <HStack gap={1} fontSize="sm" fontWeight="700" color="#8b1c2c">
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
