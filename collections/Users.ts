import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'role', 'isPublic'],
    group: 'Команда',
  },
  auth: true,
  fields: [
    // ─── Основное ───────────────────────────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      label: 'Имя мастера',
      admin: { description: 'Полное имя, отображается на сайте' },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL-slug',
      unique: true,
      admin: {
        description: 'Часть адреса страницы: /team/ivan-orlov. Латиница, цифры, дефисы.',
        position: 'sidebar',
      },
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      label: 'Показывать на сайте',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },

    // ─── Роли и звание ───────────────────────────────────────────────────────
    {
      name: 'role',
      type: 'select',
      label: 'Системная роль',
      options: [
        { label: 'Администратор', value: 'admin' },
        { label: 'Редактор', value: 'editor' },
      ],
      defaultValue: 'editor',
      admin: { position: 'sidebar' },
    },
    {
      name: 'position',
      type: 'text',
      label: 'Должность',
      admin: { description: 'Например: Ведущий Битрикс-разработчик' },
    },
    {
      name: 'craft',
      type: 'select',
      label: 'Цех (категория)',
      options: [
        { label: 'Разработка', value: 'dev' },
        { label: 'Дизайн', value: 'design' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Управление', value: 'management' },
        { label: 'Аналитика', value: 'analytics' },
        { label: 'QA', value: 'qa' },
      ],
      admin: { position: 'sidebar' },
    },

    // ─── Внешний вид ─────────────────────────────────────────────────────────
    {
      name: 'avatar',
      type: 'relationship',
      relationTo: 'media',
      label: 'Аватар',
      admin: { description: 'Фото мастера. Рекомендуется квадратное, минимум 400×400 px.' },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'О мастере',
      admin: {
        description: 'Краткое описание специалиста для страницы профиля (2–5 предложений).',
        rows: 4,
      },
    },
    {
      name: 'quote',
      type: 'text',
      label: 'Девиз / цитата',
      admin: { description: 'Короткая фраза или профессиональный принцип, отображается в Folk-стиле.' },
    },

    // ─── Навыки и опыт ───────────────────────────────────────────────────────
    {
      name: 'skills',
      type: 'array',
      label: 'Навыки / стек',
      fields: [
        {
          name: 'skill',
          type: 'text',
          label: 'Навык',
        },
      ],
      admin: { description: 'Технологии и инструменты специалиста' },
    },
    {
      name: 'yearsExperience',
      type: 'number',
      label: 'Лет опыта',
      admin: { position: 'sidebar' },
    },
    {
      name: 'projectsDone',
      type: 'number',
      label: 'Проектов сдано',
      admin: { position: 'sidebar' },
    },

    // ─── Контакты ────────────────────────────────────────────────────────────
    {
      name: 'telegram',
      type: 'text',
      label: 'Telegram username',
      admin: { description: 'Без @, например: ivan_orlov' },
    },
    {
      name: 'github',
      type: 'text',
      label: 'GitHub username',
    },
  ],
}
