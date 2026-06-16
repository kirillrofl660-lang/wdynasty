import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'On Hold', value: 'on-hold' },
      ],
      defaultValue: 'completed',
      label: 'Status',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Project Thumbnail',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Full Description',
    },
    {
      name: 'technologies',
      type: 'array',
      label: 'Technologies Used',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Technology Name',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Name (from Lucide)',
        },
      ],
    },
    {
      name: 'links',
      type: 'group',
      label: 'Project Links',
      fields: [
        {
          name: 'demo',
          type: 'text',
          label: 'Live Demo URL',
        },
        {
          name: 'github',
          type: 'text',
          label: 'GitHub URL',
        },
        {
          name: 'figma',
          type: 'text',
          label: 'Figma URL',
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Project Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption',
        },
      ],
    },
    {
      name: 'completionDate',
      type: 'date',
      label: 'Completion Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
  ],
}
