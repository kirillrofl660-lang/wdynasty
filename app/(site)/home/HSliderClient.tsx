'use client'

import dynamic from 'next/dynamic'

const HSlider = dynamic(() => import('@/src/shared/ui/HSlider').then((m) => m.HSlider), { ssr: false })

export function HSliderClient({ children }: { children: React.ReactNode }) {
  return <HSlider>{children}</HSlider>
}
