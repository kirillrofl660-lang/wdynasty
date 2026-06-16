/*import { getPayload } from 'payload'
import config from '../payload.config.ts'

async function seed() {
  const payload = await getPayload({ config })

  // Users
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'password',
      },
    })
    console.log('Created default user: admin@example.com')
  }

  // Navigation
  const existingNav = await payload.find({ collection: 'navigation', limit: 1 })
  if (existingNav.docs.length === 0) {
    await payload.create({
      collection: 'navigation',
      data: { label: 'Главная', href: '/', order: 0, isActive: true },
    })
    await payload.create({
      collection: 'navigation',
      data: { label: 'Блог', href: '/blog', order: 1, isActive: true },
    })
    console.log('Created default navigation items')
  }

  console.log('Seed completed')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})*/
