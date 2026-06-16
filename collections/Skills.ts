import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'proficiency', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Skill Name',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Database', value: 'database' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Design', value: 'design' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      label: 'Category',
    },
    {
      name: 'proficiency',
      type: 'number',
      min: 1,
      max: 100,
      required: true,
      label: 'Proficiency (%)',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon Name (Lucide)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
