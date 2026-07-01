export const revalidate = 300

import { getPayload } from 'payload'
import config from '@payload-config'
import { HomePageV2 } from './home/HomePageV2'
import { V2Header } from './V2Header'
import { V2Footer } from './V2Footer'

export default async function Page() {
  try {
    const payload = await getPayload({ config })
    const [servicesResult, cmsPage, navResult, footerSettings] = await Promise.all([
      payload.find({
        collection: 'services',
        where: { status: { equals: 'published' } },
        sort: 'order',
        limit: 20,
      }),
      payload.findGlobal({ slug: 'home-page' }).catch(() => null),
      payload.find({
        collection: 'navigation',
        sort: 'order',
        where: { isActive: { equals: true } },
      }),
      payload.findGlobal({ slug: 'footer' }).catch(() => null),
    ])
    return (
      <div className="wd-root">
        <V2Header items={navResult.docs as any} />
        <HomePageV2 cmsServices={servicesResult.docs as any} cmsPage={cmsPage} />
        <V2Footer settings={footerSettings} services={(servicesResult.docs as any[]).map((s) => ({ title: s.title, slug: s.slug }))} />
      </div>
    )
  } catch {
    return (
      <div className="wd-root">
        <V2Header items={[]} />
        <HomePageV2 />
        <V2Footer />
      </div>
    )
  }
}
