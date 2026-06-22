import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'status'],
    livePreview: {
      url: ({ data }) => {
        const isHomePage = data.slug === 'home'
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${!isHomePage ? `/blog/${data.slug}` : ''}`
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Краткое описание',
      maxLength: 300,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Содержание',
      required: true,
      editor: lexicalEditor({}),
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Теги',
      fields: [
        {
          name: 'tag',
          type: 'select',
          options: [
            'React',
            'Next.js',
            'TypeScript',
            'JavaScript',
            'CSS',
            'HTML',
            'Tailwind CSS',
            'Chakra UI',
            'Node.js',
            'Express',
            'MongoDB',
            'PostgreSQL',
            'Payload CMS',
            '1С-Битрикс',
            'Laravel',
            'PHP',
            'DevOps',
            'Docker',
            'Git',
            'Web Development',
            'Frontend',
            'Backend',
            'Full Stack',
            'UI/UX',
            'Design',
            'Tutorial',
            'Tips',
            'Best Practices',
          ],
          defaultValue: 'Web Development',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата публикации',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      defaultValue: 'draft',
      options: [
        { label: 'Черновик', value: 'draft' },
        { label: 'Опубликовано', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      label: 'SEO Title',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'SEO Description',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.publishedAt && data.status === 'published') {
          data.publishedAt = new Date()
        }
        return data
      },
    ],
  },
}
