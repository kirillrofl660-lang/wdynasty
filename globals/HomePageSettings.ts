import type { GlobalConfig } from 'payload'
import { revalidateSitePaths } from '../lib/revalidation'

export const HomePageSettings: GlobalConfig = {
  slug: 'home-page',
  label: 'Главная страница',
  admin: {
    group: 'Настройки страниц',
    description: 'Управление контентом главной страницы /',
  },
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    {
      name: 'heroSupTitle',
      type: 'text',
      label: 'Hero: надпись над логотипом',
      admin: { description: 'Например: «Студия цифрового мастерства · с 2012 года»' },
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      label: 'Hero: описание под кнопками',
    },
    {
      name: 'heroStats',
      type: 'array',
      label: 'Hero: мини-статистика под кнопками',
      maxRows: 5,
      admin: { description: 'Строка «12 лет ремесла • 240+ проектов • 38 мастеров»' },
      fields: [
        { name: 'value', type: 'text', label: 'Цифра (например: 240+)', required: true },
        { name: 'label', type: 'text', label: 'Подпись (например: проектов)', required: true },
      ],
    },

    // ── Stats strip ───────────────────────────────────────────────────────────
    {
      name: 'stats',
      type: 'array',
      label: 'Статистика (секция с цифрами)',
      maxRows: 6,
      fields: [
        { name: 'target', type: 'number', label: 'Цифра',             required: true },
        { name: 'suffix', type: 'text',   label: 'Суффикс (+ или %)' },
        { name: 'label',  type: 'text',   label: 'Подпись',           required: true },
      ],
    },

    // ── Manifesto ─────────────────────────────────────────────────────────────
    {
      name: 'manifestoQuote',
      type: 'textarea',
      label: 'Манифест: цитата',
    },
    {
      name: 'manifestoAuthor',
      type: 'text',
      label: 'Манифест: подпись под цитатой',
    },

    // ── Why Us ────────────────────────────────────────────────────────────────
    {
      name: 'whyUs',
      type: 'array',
      label: 'Преимущества «Почему выбирают нас»',
      fields: [
        { name: 'title', type: 'text',     label: 'Заголовок',  required: true },
        { name: 'desc',  type: 'textarea', label: 'Описание',   required: true },
      ],
    },

    // ── Почему не фрилансер (отстройка) ────────────────────────────────────────
    {
      name: 'freelancerLabel',
      type: 'text',
      label: 'Отстройка: надпись-метка',
      admin: { description: 'Маленький заголовок над секцией, например «В чём разница»' },
    },
    {
      name: 'freelancerHeading',
      type: 'text',
      label: 'Отстройка: заголовок секции',
      admin: { description: 'Например «Почему не фрилансер»' },
    },
    {
      name: 'freelancerPoints',
      type: 'array',
      label: 'Отстройка: пункты',
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text',     label: 'Заголовок', required: true },
        { name: 'desc',  type: 'textarea', label: 'Описание',  required: true },
      ],
    },

    // ── Pricing ───────────────────────────────────────────────────────────────
    {
      name: 'pricingLeadTitle',
      type: 'text',
      label: 'Тарифы: заголовок плашки о цене',
      admin: { description: 'Плашка над тарифами, например «Почему наша ставка ниже рынка»' },
    },
    {
      name: 'pricingLeadText',
      type: 'textarea',
      label: 'Тарифы: текст плашки о цене',
    },
    {
      name: 'pricing',
      type: 'array',
      label: 'Тарифы',
      maxRows: 4,
      fields: [
        { name: 'name',     type: 'text',     label: 'Название',          required: true },
        { name: 'desc',     type: 'text',     label: 'Подзаголовок',      required: true },
        { name: 'price',    type: 'text',     label: 'Цена',              required: true },
        { name: 'featured', type: 'checkbox', label: 'Выделенный тариф',  defaultValue: false },
        {
          name: 'features',
          type: 'array',
          label: 'Пункты',
          fields: [
            { name: 'text', type: 'text', label: 'Пункт', required: true },
          ],
        },
      ],
    },

    // ── FAQ ───────────────────────────────────────────────────────────────────
    {
      name: 'faq',
      type: 'array',
      label: 'FAQ',
      fields: [
        { name: 'q', type: 'text',     label: 'Вопрос', required: true },
        { name: 'a', type: 'textarea', label: 'Ответ',  required: true },
      ],
    },

    // ── CTA ───────────────────────────────────────────────────────────────────
    {
      name: 'ctaHeading',
      type: 'text',
      label: 'CTA: заголовок',
    },
    {
      name: 'ctaDescription',
      type: 'text',
      label: 'CTA: описание',
    },
  ],
  hooks: {
    afterChange: [({ doc }) => { revalidateSitePaths([{ path: '/' }]); return doc }],
  },
}
