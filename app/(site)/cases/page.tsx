export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Badge } from '@chakra-ui/react'

export const metadata: Metadata = {
  title: 'Кейсы и цены | WebDynasty',
  description: 'Реальные кейсы по разработке: что делали, сколько стоит и какие факторы влияют на цену. Ответы на вопросы, которые вы ищете в Google.',
}

export default async function CasesPage() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'cases',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 100,
  })
  const cases = result.docs as any[]

  return (
    <Box className="wd-root" bg="#fafafa" minH="100vh" py={{ base: 16, md: 24 }}>
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <VStack gap={4} align="start" mb={{ base: 10, md: 14 }}>
          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
            fontWeight="700"
            color="#111"
            lineHeight="1.2"
          >
            Кейсы и цены
          </Heading>
          <Text color="#555" fontSize={{ base: 'md', md: 'lg' }} maxW="720px" lineHeight="1.7">
            Разбираем реальные задачи: что делали, сколько стоит и какие нюансы могут изменить цену.
            Ищите ответ на свой вопрос — скорее всего, мы уже решали похожее.
          </Text>
        </VStack>

        {cases.length === 0 ? (
          <Text color="#777">Пока нет опубликованных кейсов. Скоро добавим.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {cases.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <Box
                  bg="white"
                  borderRadius="20px"
                  p={6}
                  h="full"
                  style={{ border: '1px solid rgba(0,0,0,0.06)' }}
                  transition="transform 0.2s, box-shadow 0.2s"
                  _hover={{ transform: 'translateY(-4px)', boxShadow: '0 20px 50px rgba(139,92,246,.12)' }}
                >
                  {c.service?.title && (
                    <Badge
                      mb={3}
                      px={3}
                      py={1}
                      borderRadius="999px"
                      style={{ background: 'rgba(139,92,246,.08)', color: '#8b5cf6' }}
                    >
                      {c.service.title}
                    </Badge>
                  )}
                  <Heading as="h2" fontSize="xl" fontWeight="600" color="#111" mb={2} lineHeight="1.3">
                    {c.title}
                  </Heading>
                  {c.searchQuery && (
                    <Text fontSize="sm" color="#777" fontStyle="italic" mb={3}>
                      «{c.searchQuery}»
                    </Text>
                  )}
                  {c.excerpt && (
                    <Text fontSize="sm" color="#555" lineHeight="1.6" mb={4}>
                      {c.excerpt}
                    </Text>
                  )}
                  <HStack justify="space-between" mt="auto" pt={4} style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                    <Text fontSize="sm" fontWeight="600" color="#111">
                      {c.basePrice ?? 'Цена по запросу'}
                    </Text>
                    <Text fontSize="sm" color="#8b5cf6" fontWeight="500">
                      Подробнее →
                    </Text>
                  </HStack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}
