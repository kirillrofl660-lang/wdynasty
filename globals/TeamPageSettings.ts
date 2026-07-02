import type { GlobalConfig } from 'payload'
import { revalidateSitePaths } from '../lib/revalidation'

export const TeamPageSettings: GlobalConfig = {
  slug: 'team-page',
  label: 'Страница «О компании»',
  admin: {
    group: 'Настройки страниц',
    description: 'Управление контентом страницы /team',
  },
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    {
      name: 'heroHeading',
      type: 'text',
      label: 'Hero: основной заголовок',
      admin: { description: 'Первая часть заголовка (обычный текст)' },
    },
    {
      name: 'heroHeadingAccent',
      type: 'text',
      label: 'Hero: акцентная часть заголовка',
      admin: { description: 'Курсив crimson-цветом' },
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      label: 'Hero: описание под заголовком',
    },

    // ── Stats ─────────────────────────────────────────────────────────────────
    {
      name: 'stats',
      type: 'array',
      label: 'Статистика (crimson-полоса)',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', label: 'Значение', required: true },
        { name: 'label', type: 'text', label: 'Подпись', required: true },
      ],
    },

    // ── History ───────────────────────────────────────────────────────────────
    {
      name: 'historyHeading',
      type: 'text',
      label: 'История: заголовок',
    },
    {
      name: 'historyParagraphs',
      type: 'array',
      label: 'История: параграфы текста',
      fields: [
        { name: 'text', type: 'textarea', label: 'Текст параграфа', required: true },
      ],
    },
    {
      name: 'timeline',
      type: 'array',
      label: 'История: таймлайн',
      fields: [
        { name: 'year',  type: 'text', label: 'Год / метка',  required: true },
        { name: 'event', type: 'text', label: 'Событие',      required: true },
      ],
    },

    // ── Values ────────────────────────────────────────────────────────────────
    {
      name: 'valuesHeading',
      type: 'text',
      label: 'Принципы: заголовок',
    },
    {
      name: 'valuesSubtitle',
      type: 'text',
      label: 'Принципы: подзаголовок',
    },
    {
      name: 'values',
      type: 'array',
      label: 'Принципы: карточки',
      fields: [
        { name: 'title', type: 'text',     label: 'Название',   required: true },
        { name: 'text',  type: 'textarea', label: 'Описание',   required: true },
      ],
    },

    // ── CTA ───────────────────────────────────────────────────────────────────
    {
      name: 'showCta',
      type: 'checkbox',
      label: 'Показывать блок «Присоединиться»',
      defaultValue: true,
    },
    {
      name: 'ctaHeading',
      type: 'text',
      label: 'CTA: заголовок',
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      label: 'CTA: описание',
    },
    {
      name: 'ctaEmail',
      type: 'email',
      label: 'CTA: email для кнопки «Написать нам»',
    },
  ],
  hooks: {
    afterChange: [({ doc }) => { revalidateSitePaths([{ path: '/team' }]); return doc }],
  },
}
