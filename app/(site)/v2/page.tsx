export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import { HomePageV2Client } from './HomePageV2Client'

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
    return <HomePageV2Client cmsServices={servicesResult.docs as any} cmsPage={cmsPage} />
  } catch {
    return <HomePageV2Client />
  }
}
