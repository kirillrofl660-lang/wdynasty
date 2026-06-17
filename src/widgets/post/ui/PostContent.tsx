'use client'

import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  Badge,
  Icon,
  Button,
  Container,
  Flex,
  Card,
  CardBody,
} from '@chakra-ui/react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { PostContentProps } from '../model/types'
import { formatDate } from '@/src/shared/lib/formatDate'

const extractText = (node: any): string => {
  if (!node) return ''
  if (Array.isArray(node)) return node.map(extractText).join(' ')
  if (typeof node.text === 'string') return node.text + ' '
  if (Array.isArray(node.children)) return node.children.map(extractText).join(' ')
  return ''
}

export function PostContent({ post, relatedPosts = [] }: PostContentProps) {
  const formattedDate = post.publishedAt ? formatDate(post.publishedAt) : ''

  const readingTime = () => {
    const wordsPerMinute = 200
    const text = post.content?.root
      ? extractText(post.content.root.children)
      : (post.excerpt || '')
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
  }

  return (
    <Box>
      <Box bg="brand.950" color="white" pt={{ base: 6, md: 8 }} pb={{ base: 8, md: 10 }} px={4}>
        <Container maxW="6xl">
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 4, lg: 12 }} align="start">
            <VStack gap={4} align="start" maxW={{ lg: '760px' }} flex="1" minW={0}>
              <Link href="/blog">
                <HStack gap={2} fontSize="sm" color="whiteAlpha.700" transition="color 0.2s" _hover={{ color: 'accent.400' }}>
                  <Icon as={ArrowLeft} w={4} h={4} />
                  <Text>Назад к блогу</Text>
                </HStack>
              </Link>

              {post.tags && post.tags.length > 0 && (
                <Flex wrap="wrap" gap={2}>
                  {post.tags.map((tag, index) =>
                    tag.tag ? <Badge key={index} colorPalette="accent" size="sm">{tag.tag}</Badge> : null
                  )}
                </Flex>
              )}

              <Heading as="h1" fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" lineHeight="shorter">
                {post.title}
              </Heading>

              <HStack gap={4} fontSize="sm" color="whiteAlpha.700" flexWrap="wrap">
                {post.publishedAt && (
                  <HStack gap={2} suppressHydrationWarning>
                    <Icon as={Calendar} w={4} h={4} />
                    <Text suppressHydrationWarning>{formattedDate}</Text>
                  </HStack>
                )}
                <HStack gap={2}>
                  <Icon as={Clock} w={4} h={4} />
                  <Text>{readingTime()} мин чтения</Text>
                </HStack>
              </HStack>

              {post.excerpt && (
                <Box bg="gray.100" borderRadius="md" px={4} py={3} w="full">
                  <Text fontSize="md" color="gray.800" lineHeight="relaxed">{post.excerpt}</Text>
                </Box>
              )}
            </VStack>

            <Box w={{ base: 'full', lg: '300px' }} flexShrink={0} display={{ base: 'none', lg: 'block' }} />
          </Flex>
        </Container>
      </Box>

      <Container maxW="6xl" px={4}>
        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, lg: 12 }} align="start" mb={16}>
          <VStack flex="1" minW={0} maxW={{ lg: '760px' }} gap={8} align="stretch" mt={{ base: 10, md: 12 }}>
            {post.coverImage && post.coverImage.url && (
              <Box borderRadius="xl" overflow="hidden" shadow="xl">
                <Image src={post.coverImage.url} alt={post.title} w="full" h={{ base: '240px', md: '420px' }} objectFit="cover" />
              </Box>
            )}

            <Card.Root bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="xl" overflow="hidden">
              <CardBody p={{ base: 6, md: 8 }}>
                <Box className="prose prose-lg max-w-none">
                  {post.content && <RichText data={post.content} />}
                </Box>
              </CardBody>
            </Card.Root>

            <Box borderTopWidth="1px" borderColor="gray.200" pt={8} mt={4}>
              <Button asChild colorPalette="brand" variant="outline" borderRadius="full">
                <Link href="/blog">
                  <Icon as={ArrowLeft} w={4} h={4} />
                  <span>Ко всем статьям</span>
                </Link>
              </Button>
            </Box>
          </VStack>

          <Box as="aside" w={{ base: 'full', lg: '300px' }} flexShrink={0} mt={{ lg: 12 }}>
            {relatedPosts.length > 0 && (
              <Card.Root bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="xl">
                <CardBody p={6}>
                  <VStack align="start" gap={5}>
                    <Heading size="sm" color="gray.900">Похожие статьи</Heading>
                    <VStack align="stretch" gap={4} w="full">
                      {relatedPosts.map((rp) => {
                        const rpDate = rp.publishedAt ? formatDate(rp.publishedAt, true) : ''
                        return (
                          <Link key={rp.id} href={`/blog/${rp.slug}`} style={{ textDecoration: 'none' }}>
                            <HStack gap={3} p={3} borderRadius="lg" transition="all 0.2s" _hover={{ bg: 'gray.50' }}>
                              {rp.coverImage && rp.coverImage.url ? (
                                <Box w={14} h={14} borderRadius="md" overflow="hidden" flexShrink={0} bg="gray.100">
                                  <Image src={rp.coverImage.url} alt={rp.title} w="full" h="full" objectFit="cover" />
                                </Box>
                              ) : (
                                <Box w={14} h={14} borderRadius="md" bg="brand.100" flexShrink={0} display="flex" alignItems="center" justifyContent="center">
                                  <Text fontWeight="bold" color="brand.600">{rp.title.charAt(0)}</Text>
                                </Box>
                              )}
                              <VStack align="start" gap={0.5} minW={0}>
                                <Text fontSize="sm" fontWeight="medium" color="gray.900" lineHeight="short" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                  {rp.title}
                                </Text>
                                {rpDate && <Text fontSize="xs" color="gray.500">{rpDate}</Text>}
                              </VStack>
                            </HStack>
                          </Link>
                        )
                      })}
                    </VStack>
                  </VStack>
                </CardBody>
              </Card.Root>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
