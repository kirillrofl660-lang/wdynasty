'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'

export function LexicalRenderer({ data }: { data: any }) {
  if (!data || !data.root) return null
  return <RichText data={data} />
}
