'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Input,
  Button,
  SimpleGrid,
  Container,
  Icon,
  Flex,
  Center,
} from '@chakra-ui/react'
import { BlogCard } from './BlogCard'
import { ScrollReveal, StaggerContainer } from '@/src/shared/ui'
import { Post } from '@/src/entities/post/model'
import { BlogGridProps, PostsResponse } from '../model/types'
import { fetchPosts, fetchTags } from '../model/api'

export function BlogGrid({ initialPosts, initialTotalPages }: BlogGridProps) {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setTimeout(() => setDebouncedSearch(value), 300)
  }

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    setPage(1)
  }

  const { data, isLoading } = useQuery<PostsResponse>({
    queryKey: ['posts', page, selectedTag, debouncedSearch],
    queryFn: () => fetchPosts(page, selectedTag, debouncedSearch),
    initialData:
      page === 1 && selectedTag === 'all' && !debouncedSearch
        ? {
            docs: initialPosts,
            totalPages: initialTotalPages,
            totalDocs: initialPosts.length,
            page: 1,
            hasNextPage: initialTotalPages > 1,
            hasPrevPage: false,
          }
        : undefined,
  })

  const { data: allTags } = useQuery<string[]>({
    queryKey: ['tags'],
    queryFn: fetchTags,
  })

  const posts = data?.docs ?? []
  const totalPages = data?.totalPages ?? 1

  return (
    <Box>
      <Box bg="#fafafa" py={{ base: 20, md: 28 }} px={4} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Container maxW="4xl">
          <ScrollReveal>
            <VStack gap={5} textAlign="center">
              <Text fontSize="13px" fontWeight="700" letterSpacing="3px" textTransform="uppercase" color="#8b5cf6">Блог</Text>
              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '6xl' }}
                fontWeight="800"
                letterSpacing="-0.02em"
                lineHeight="shorter"
                color="#111"
              >
                Статьи и{' '}
                <Text as="span" style={{ background: 'linear-gradient(90deg,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>инсайты</Text>
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="#666" maxW="2xl">
                Разбираем 1С-Битрикс, Laravel, React и DevOps. Делимся опытом
                и практическими решениями из реальных проектов.
              </Text>
            </VStack>
          </ScrollReveal>
        </Container>
      </Box>

      <Container maxW="6xl" py={{ base: 12, md: 16 }} px={4}>
        <VStack gap={5} mb={12}>
          <Box maxW="md" w="full">
            <Flex
              align="center"
              gap={3}
              bg="white"
              border="1.5px solid"
              borderColor="rgba(0,0,0,0.15)"
              borderRadius="999px"
              px={4}
              py={1}
              transition="border-color 0.2s"
              _focusWithin={{ borderColor: '#8b5cf6' }}
            >
              <Icon as={Search} color="gray.400" />
              <Input
                placeholder="Поиск по статьям..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                border="none"
                px={0}
                _focus={{ boxShadow: 'none', outline: 'none' }}
              />
            </Flex>
          </Box>

          {allTags && allTags.length > 0 && (
            <Flex wrap="wrap" justify="center" gap={2}>
              <Button
                onClick={() => handleTagChange('all')}
                size="sm"
                borderRadius="full"
                colorPalette="purple"
                variant={selectedTag === 'all' ? 'solid' : 'outline'}
              >
                Все статьи
              </Button>

              {allTags.map((tag: string) => (
                <Button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  size="sm"
                  borderRadius="full"
                  colorPalette="purple"
                  variant={selectedTag === tag ? 'solid' : 'outline'}
                >
                  {tag}
                </Button>
              ))}
            </Flex>
          )}
        </VStack>

        {isLoading ? (
          <Center py={16}>
            <Text color="gray.500">Загрузка...</Text>
          </Center>
        ) : posts.length === 0 ? (
          <VStack gap={4} py={16} textAlign="center">
            <Center w={20} h={20} bg="gray.100" borderRadius="full">
              <Icon as={Search} w={9} h={9} color="gray.400" />
            </Center>
            <Heading fontSize="xl" fontWeight="semibold" color="gray.900">
              Статьи не найдены
            </Heading>
            <Text color="gray.600">
              Попробуйте изменить параметры поиска или фильтры
            </Text>
          </VStack>
        ) : (
          <StaggerContainer stagger={0.1}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {posts.map((post: Post, index: number) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </SimpleGrid>
          </StaggerContainer>
        )}

        {totalPages > 1 && (
          <HStack justify="center" gap={2} mt={12}>
            <Button
              size="sm"
              variant="outline"
              borderRadius="full"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              colorPalette="purple"
            >
              Назад
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                size="sm"
                borderRadius="full"
                colorPalette="purple"
                variant={p === page ? 'solid' : 'outline'}
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline"
              borderRadius="full"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              colorPalette="purple"
            >
              Вперёд
            </Button>
          </HStack>
        )}
      </Container>
    </Box>
  )
}
