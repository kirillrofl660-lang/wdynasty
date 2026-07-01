'use client'

import { ScrollReveal } from '@/src/shared/ui'

export function ScrollRevealClient({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ScrollReveal className={className}>{children}</ScrollReveal>
}
