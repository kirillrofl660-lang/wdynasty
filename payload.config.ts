import { buildConfig } from 'payload'

import { sqliteAdapter } from '@payloadcms/db-sqlite'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import path from 'path'

import { fileURLToPath } from 'url'



import { Users } from './collections/Users'

import { Pages } from './collections/Pages'

import { Media } from './collections/Media'

import { Projects } from './collections/Projects'

import { Skills } from './collections/Skills'

import { Posts } from './collections/Posts'

import { Navigation } from './collections/Navigation'

import { Leads } from './collections/Leads'

import { TelegramSubscribers } from './collections/TelegramSubscribers'

import { Services } from './collections/Services'

import { TeamPageSettings } from './globals/TeamPageSettings'
import { HomePageSettings } from './globals/HomePageSettings'
import { FooterSettings } from './globals/FooterSettings'



const filename = fileURLToPath(import.meta.url)

const dirname = path.dirname(filename)



export default buildConfig({

  admin: {

    user: Users.slug,

    importMap: {

      baseDir: path.resolve(dirname),

    },

  },

  collections: [Users, Pages, Media, Projects, Skills, Posts, Navigation, Leads, TelegramSubscribers, Services],

  globals: [TeamPageSettings, HomePageSettings, FooterSettings],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',

  typescript: {

    outputFile: path.resolve(dirname, 'payload-types.ts'),

  },

  db: sqliteAdapter({

    client: {

      url: process.env.TURSO_DATABASE_URL || 'file:./local.db',

      authToken: process.env.TURSO_AUTH_TOKEN,

    },

    push: process.env.NODE_ENV === 'development',

  }),

})

