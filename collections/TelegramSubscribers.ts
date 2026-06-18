import { CollectionConfig } from 'payload'

export const TelegramSubscribers: CollectionConfig = {
  slug: 'tg-subscribers',
  labels: {
    singular: 'Подписчик Telegram',
    plural: 'Подписчики Telegram',
  },
  access: {
    // Управляется ботом server-side (overrideAccess), для остальных закрыто
    read: ({ req: { user } }) => Boolean(user),
    create: () => false,
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'chatId',
    defaultColumns: ['firstName', 'username', 'chatId', 'isActive'],
    description: 'Пользователи, подписанные на уведомления о заявках через Telegram-бота.',
  },
  fields: [
    {
      name: 'chatId',
      type: 'text',
      label: 'Chat ID',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'username',
      type: 'text',
      label: 'Username',
    },
    {
      name: 'firstName',
      type: 'text',
      label: 'Имя',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Активна подписка',
      defaultValue: true,
    },
  ],
}
