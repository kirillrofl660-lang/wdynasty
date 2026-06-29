export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { EcommerceBitrixTemplate } from '../templates/EcommerceBitrixTemplate'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })
  const service = result.docs[0]
  if (!service) return {}

  return {
    title: service.metaTitle || `${service.title} | Династия Разработчиков`,
    description: service.metaDescription || '',
    alternates: { canonical: `https://wdynasty.ru/uslugi/${slug}` },
    openGraph: {
      title: service.metaTitle || service.title,
      description: service.metaDescription || '',
      url: `https://wdynasty.ru/uslugi/${slug}`,
      images: [{ url: '/api/og', width: 1200, height: 630 }],
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })
  const service = result.docs[0] as any
  if (!service) notFound()

  switch (service.template) {
    case 'ecommerce-bitrix':
      return <EcommerceBitrixTemplate service={service} />
    default:
      notFound()
  }
}
