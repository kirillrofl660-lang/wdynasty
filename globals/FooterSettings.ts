import type { GlobalConfig } from 'payload'
import { revalidateSitePaths } from '../lib/revalidation'

export const FooterSettings: GlobalConfig = {
  slug: 'footer',
  label: 'Футер',
  admin: {
    group: 'Настройки страниц',
    description: 'Управление содержимым подвала сайта',
  },
  fields: [
    // ── Brand ─────────────────────────────────────────────────────────────────
    {
      name: 'brandDescription',
      type: 'textarea',
      label: 'Описание бренда (под логотипом)',
    },

    // ── Services column ───────────────────────────────────────────────────────
    {
      name: 'servicesLinks',
      type: 'array',
      label: 'Колонка «Услуги»',
      fields: [
        { name: 'label', type: 'text', label: 'Текст ссылки', required: true },
        { name: 'href',  type: 'text', label: 'URL',          required: true },
      ],
    },

    // ── Company column ────────────────────────────────────────────────────────
    {
      name: 'companyLinks',
      type: 'array',
      label: 'Колонка «Компания»',
      fields: [
        { name: 'label', type: 'text', label: 'Текст ссылки', required: true },
        { name: 'href',  type: 'text', label: 'URL',          required: true },
      ],
    },

    // ── Contacts ──────────────────────────────────────────────────────────────
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'contactHours',
      type: 'text',
      label: 'Часы работы',
    },

    // ── Bottom bar ────────────────────────────────────────────────────────────
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Копирайт (левый текст)',
    },
    {
      name: 'copyrightNote',
      type: 'text',
      label: 'Примечание (правый текст)',
    },
  ],
  hooks: {
    afterChange: [({ doc }) => { revalidateSitePaths([{ path: '/', type: 'layout' }]); return doc }],
  },
}
