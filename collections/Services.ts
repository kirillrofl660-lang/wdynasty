import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'template', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок (H1)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL slug',
      admin: { description: 'например: ecommerce-1c-bitrix' },
    },
    {
      name: 'template',
      type: 'select',
      required: true,
      label: 'Шаблон страницы',
      options: [
        { label: 'E-commerce на 1С-Битрикс', value: 'ecommerce-bitrix' },
        { label: 'Корпоративный портал Битрикс24', value: 'bitrix24-portal' },
        { label: 'Laravel разработка', value: 'laravel' },
        { label: 'DevOps и инфраструктура', value: 'devops' },
      ],
      admin: { description: 'Определяет какой компонент отрендерит страницу' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Опубликовано', value: 'published' },
        { label: 'Черновик', value: 'draft' },
      ],
      label: 'Статус',
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Hero секция',
      fields: [
        { name: 'badge', type: 'text', label: 'Бейдж (над заголовком)' },
        { name: 'title', type: 'text', label: 'Заголовок hero' },
        { name: 'titleHighlight', type: 'text', label: 'Выделенная часть заголовка (голубая)' },
        { name: 'description', type: 'textarea', label: 'Описание' },
        {
          name: 'stats',
          type: 'array',
          label: 'Статистика',
          fields: [
            { name: 'value', type: 'text', label: 'Значение (5+)' },
            { name: 'label', type: 'text', label: 'Подпись' },
          ],
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Блоки функционала',
      fields: [
        { name: 'title', type: 'text', label: 'Название' },
        { name: 'description', type: 'textarea', label: 'Описание' },
        {
          name: 'icon',
          type: 'select',
          label: 'Иконка',
          options: [
            { label: 'Корзина', value: 'ShoppingCart' },
            { label: 'Оплата', value: 'CreditCard' },
            { label: 'Доставка', value: 'Truck' },
            { label: 'Интеграция', value: 'Package' },
            { label: 'Аналитика', value: 'BarChart' },
            { label: 'Скорость', value: 'Zap' },
            { label: 'Безопасность', value: 'Shield' },
            { label: 'Пользователи', value: 'Users' },
            { label: 'Настройки', value: 'Settings' },
            { label: 'Сервер', value: 'Server' },
            { label: 'Код', value: 'Code' },
            { label: 'База данных', value: 'Database' },
          ],
        },
      ],
    },
    {
      name: 'workStages',
      type: 'array',
      label: 'Этапы работы',
      fields: [
        { name: 'num', type: 'text', label: 'Номер (01, 02...)' },
        { name: 'title', type: 'text', label: 'Название этапа' },
        { name: 'desc', type: 'textarea', label: 'Описание' },
      ],
    },
    {
      name: 'prices',
      type: 'array',
      label: 'Тарифы',
      fields: [
        { name: 'name', type: 'text', label: 'Название тарифа' },
        { name: 'price', type: 'text', label: 'Цена (от 150 000 ₽)' },
        { name: 'term', type: 'text', label: 'Срок (от 4 недель)' },
        { name: 'popular', type: 'checkbox', label: 'Популярный' },
        {
          name: 'features',
          type: 'array',
          label: 'Что входит',
          fields: [{ name: 'text', type: 'text', label: 'Пункт' }],
        },
      ],
    },
    {
      name: 'includedInPrice',
      type: 'array',
      label: 'Включено во все тарифы',
      fields: [{ name: 'text', type: 'text', label: 'Пункт' }],
    },
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
    },
  ],
}
