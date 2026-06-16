import { CollectionConfig } from 'payload'

export const Navigation: CollectionConfig = {
  slug: 'navigation',
  labels: {
    singular: 'Меню',
    plural: 'Меню',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'label',
    description: 'Управление пунктами главного меню навигации сайта.',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Название',
      required: true,
      admin: {
        description: 'Текст, который отображается в меню',
      },
    },
    {
      name: 'href',
      type: 'text',
      label: 'Ссылка',
      required: true,
      admin: {
        description: 'URL или путь, например: /blog, /about, /services',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
      admin: {
        description: 'Меньше = левее в меню',
      },
    },
    {
      name: 'isExternal',
      type: 'checkbox',
      label: 'Внешняя ссылка',
      defaultValue: false,
      admin: {
        description: 'Открывать в новой вкладке',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Активно',
      defaultValue: true,
    },
  ],
}
