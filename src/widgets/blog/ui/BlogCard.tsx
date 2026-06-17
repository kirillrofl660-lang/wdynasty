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
  Badge,
  Icon,
  Card,
  CardBody,
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
      <Card.Root
        variant="outline"
        overflow="hidden"
        h="full"
        transition="all 0.3s ease"
        _hover={{
          borderColor: 'brand.500',
          shadow: 'lg',
          transform: 'translateY(-4px)',
        }}
        css={{ '&:hover .blog-card-img': { transform: 'scale(1.05)' } }}
      >
        <Box position="relative" h={48} overflow="hidden" bg="gray.100">
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
              bg="brand.950"
              transition="transform 0.5s ease"
            >
              <Text fontSize="6xl" fontWeight="bold" color="whiteAlpha.300">
                {post.title.charAt(0)}
              </Text>
            </Center>
          )}
        </Box>

        <CardBody p={6}>
          <VStack align="start" gap={3} h="full">
            {post.tags && post.tags.length > 0 && (
              <HStack gap={2} wrap="wrap">
                {post.tags.slice(0, 3).map((tag, i) =>
                  tag.tag ? (
                    <Badge key={i} size="sm" colorPalette="brand" variant="subtle">
                      {tag.tag}
                    </Badge>
                  ) : null,
                )}
              </HStack>
            )}

            <Heading
              as="h3"
              size="md"
              color="gray.900"
              fontWeight="semibold"
              lineHeight="short"
              transition="color 0.2s"
              _groupHover={{ color: 'brand.600' }}
            >
              {post.title}
            </Heading>

            {post.excerpt && (
              <Text
                color="gray.600"
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

            <HStack justify="space-between" w="full" pt={2} mt="auto">
              {post.publishedAt && (
                <HStack gap={1} fontSize="xs" color="gray.500">
                  <Icon as={Calendar} w={3.5} h={3.5} />
                  <Text suppressHydrationWarning>{formattedDate}</Text>
                </HStack>
              )}
              <HStack gap={1} fontSize="sm" fontWeight="medium" color="brand.600">
                <Text>Читать</Text>
                <Icon as={ArrowRight} w={4} h={4} />
              </HStack>
            </HStack>
          </VStack>
        </CardBody>
      </Card.Root>
    </Link>
  )
}
