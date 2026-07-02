'use client'

import dynamic from 'next/dynamic'

const LeadForm = dynamic(() => import('@/src/shared/ui/LeadForm').then((m) => m.LeadForm), { ssr: false })

export function LeadFormClient() {
  return <LeadForm />
}
