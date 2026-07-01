'use client'

import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = window.matchMedia('(max-width: 768px)')

    const update = () => setReduced(reducedMotion.matches || mobile.matches)
    update()

    const handler = () => update()
    reducedMotion.addEventListener('change', handler)
    mobile.addEventListener('change', handler)

    return () => {
      reducedMotion.removeEventListener('change', handler)
      mobile.removeEventListener('change', handler)
    }
  }, [])

  return reduced
}
