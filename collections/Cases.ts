import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Cases: CollectionConfig = {
  slug: 'cases',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'service', 'status', 'publishedAt'],
    description: 'Кейсы с ценами, факторами стоимости и SEO-ответами на вопросы клиентов',
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
      admin: { description: 'Например: «Кастомизация корзины в 1С-Битрикс»' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL slug',
      admin: { description: 'Например: kastomizaciya-korziny-bitrix' },
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
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата публикации',
      admin: { position: 'sidebar' },
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Связанные услуги',
      admin: { position: 'sidebar', description: 'Можно привязать кейс к нескольким услугам' },
    },

    // ── SEO question ──────────────────────────────────────────────────────────
    {
      name: 'searchQuery',
      type: 'text',
      label: 'Вопрос, который ищет клиент',
      admin: { description: 'Например: «Как кастомизировать корзину в Битрикс?» — для SEO и заголовков' },
    },

    // ── Hero / cover ──────────────────────────────────────────────────────────
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Краткое описание (для списка и meta)',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка кейса',
    },

    // ── Story blocks ──────────────────────────────────────────────────────────
    {
      name: 'problem',
      type: 'textarea',
      label: 'Проблема клиента',
      admin: { description: 'Какую боль решали' },
    },
    {
      name: 'solution',
      type: 'richText',
      label: 'Решение',
      editor: lexicalEditor({}),
    },
    {
      name: 'result',
      type: 'richText',
      label: 'Результат',
      editor: lexicalEditor({}),
    },

    // ── Pricing ───────────────────────────────────────────────────────────────
    {
      name: 'basePrice',
      type: 'text',
      label: 'Примерная стоимость (от 80 000 ₽) — для отображения',
      admin: { description: 'Текстовое поле для красивого вывода. Для расчётов калькулятора используйте группу ниже.' },
    },
    {
      name: 'calculator',
      type: 'group',
      label: 'Данные для калькулятора (все числа)',
      admin: { description: 'Калькулятор будет считать стоимость по этим полям' },
      fields: [
        { name: 'basePrice', type: 'number', label: 'Базовая цена, ₽' },
        { name: 'minHours', type: 'number', label: 'Минимум часов' },
        { name: 'maxHours', type: 'number', label: 'Максимум часов' },
        { name: 'hourlyRate', type: 'number', label: 'Ставка за час, ₽' },
        {
          name: 'multipliers',
          type: 'array',
          label: 'Множители стоимости',
          admin: { description: 'Добавляйте факторы, влияющие на цену. Каждый множитель — это title и число.' },
          fields: [
            { name: 'title', type: 'text', label: 'Название фактора', required: true },
            { name: 'coefficient', type: 'number', label: 'Коэффициент', required: true },
          ],
        },
      ],
    },
    {
      name: 'priceNote',
      type: 'textarea',
      label: 'Примечание к цене',
      admin: { description: 'Например: «Цена зависит от объёма правок и состояния текущего кода»' },
    },
    {
      name: 'priceFactors',
      type: 'array',
      label: 'Факторы, влияющие на стоимость',
      admin: { description: 'Каждый фактор: что удорожает/удешевляет работу и на сколько' },
      fields: [
        { name: 'title', type: 'text', label: 'Фактор', required: true },
        { name: 'description', type: 'textarea', label: 'Описание' },
        {
          name: 'impact',
          type: 'text',
          label: 'Влияние на цену',
          admin: { description: 'Например: «+10–15%», «−5%», «бесплатно при базовой настройке»' },
        },
      ],
    },

    // ── FAQ ───────────────────────────────────────────────────────────────────
    {
      name: 'faq',
      type: 'array',
      label: 'FAQ по кейсу',
      fields: [
        { name: 'question', type: 'text', label: 'Вопрос', required: true },
        { name: 'answer', type: 'richText', label: 'Ответ', editor: lexicalEditor({}), required: true },
      ],
    },

    // ── SEO ───────────────────────────────────────────────────────────────────
    {
      name: 'metaTitle',
      type: 'text',
      label: 'SEO Title',
      admin: { position: 'sidebar' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'SEO Description',
      admin: { position: 'sidebar' },
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
