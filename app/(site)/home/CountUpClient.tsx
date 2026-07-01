'use client'

import dynamic from 'next/dynamic'

const CountUp = dynamic(() => import('@/src/shared/ui/CountUp').then((m) => m.CountUp), { ssr: false })

export function CountUpClient({ end }: { end: number }) {
  return <CountUp end={end} />
}
