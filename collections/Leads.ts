import { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: 'Заявка',
    plural: 'Заявки',
  },
  access: {
    // Любой посетитель может оставить заявку с формы
    create: () => true,
    // Просматривать и менять статус могут только авторизованные
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'contact', 'status', 'createdAt'],
    description: 'Заявки, оставленные через форму на сайте.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
      required: true,
    },
    {
      name: 'contact',
      type: 'text',
      label: 'Контакт',
      required: true,
      admin: {
        description: 'Email, телефон или Telegram для связи',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Сообщение',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      defaultValue: 'new',
      options: [
        { label: 'Новый', value: 'new' },
        { label: 'Обработанный', value: 'processed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
