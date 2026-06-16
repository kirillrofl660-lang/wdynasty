import config from '@payload-config'
import { RootPage } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'
import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Payload Admin',
    description: 'Content Management System'
  }
}

const Page = ({ params, searchParams }: Args) => {
  return RootPage({ config, importMap, params, searchParams })
}

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export default Page
