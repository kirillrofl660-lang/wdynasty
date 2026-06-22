export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import { HomePageClient } from './HomePageClient'

export default async function Page() {
  try {
    const payload = await getPayload({ config })
    const [servicesResult, cmsPage] = await Promise.all([
      payload.find({
        collection: 'services',
        where: { status: { equals: 'published' } },
        limit: 20,
      }),
      payload.findGlobal({ slug: 'home-page' }).catch(() => null),
    ])
    return <HomePageClient cmsServices={servicesResult.docs as any} cmsPage={cmsPage} />
  } catch {
    return <HomePageClient />
  }
}
