'use client'

import dynamic from 'next/dynamic'

export const LeadForm = dynamic(
  () => import('@/src/widgets/lead/ui/LeadForm').then((m) => m.LeadForm),
  { ssr: false },
)
