import config from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap.js'

import '@payloadcms/next/css'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => {
  // Create serverFunction wrapper that matches ServerFunctionClient signature
  const serverFunction = async ({ args, name }: { args: Record<string, unknown>; name: string }) => {
    'use server'
    return handleServerFunctions({
      args,
      config,
      importMap,
      name,
    })
  }

  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}

export default Layout
