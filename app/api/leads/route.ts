import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/src/shared/lib/rateLimit'
import { sendTelegramMessage, escapeHtml } from '@/src/shared/lib/telegram'

// Минимальное время заполнения формы человеком (мс)
const MIN_FILL_MS = 3000
// Лимит заявок с одного IP
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 час

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

/**
 * CSRF-защита: проверяем, что запрос пришёл с нашего же домена.
 * Сравниваем host из Origin/Referer с host самого запроса.
 */
function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin') || req.headers.get('referer')
  if (!origin) return false

  const host = req.headers.get('host')
  if (!host) return false

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. CSRF: только запросы с нашего домена
    if (!isSameOrigin(req)) {
      return NextResponse.json({ error: 'Недопустимый источник запроса' }, { status: 403 })
    }

    // 2. Rate limit по IP
    const ip = getClientIp(req)
    const { allowed } = rateLimit(`leads:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Слишком много заявок. Попробуйте позже.' },
        { status: 429 },
      )
    }

    const body = await req.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const contact = typeof body.contact === 'string' ? body.contact.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    const honeypot = typeof body.website === 'string' ? body.website.trim() : ''
    const elapsed = typeof body.elapsed === 'number' ? body.elapsed : 0

    // 3. Honeypot: скрытое поле заполнено — это бот.
    // Возвращаем фейковый успех, чтобы не подсказывать боту причину.
    if (honeypot) {
      return NextResponse.json({ ok: true })
    }

    // 4. Time-trap: форму заполнили подозрительно быстро — вероятно бот
    if (elapsed < MIN_FILL_MS) {
      return NextResponse.json({ ok: true })
    }

    if (!name || !contact) {
      return NextResponse.json(
        { error: 'Укажите имя и контакт для связи' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'leads',
      data: {
        name,
        contact,
        message,
        status: 'new',
      },
    })

    // Рассылка уведомления всем активным подписчикам бота (не блокирует ответ)
    const lines = [
      '<b>🔔 Новая заявка</b>',
      '',
      `<b>Имя:</b> ${escapeHtml(name)}`,
      `<b>Контакт:</b> ${escapeHtml(contact)}`,
    ]
    if (message) lines.push(`<b>Сообщение:</b> ${escapeHtml(message)}`)
    const text = lines.join('\n')

    void payload
      .find({
        collection: 'tg-subscribers',
        where: { isActive: { equals: true } },
        limit: 1000,
        overrideAccess: true,
      })
      .then((subs) =>
        Promise.allSettled(
          subs.docs.map((sub: any) => sendTelegramMessage(sub.chatId, text)),
        ),
      )
      .catch((err) => console.error('Failed to notify subscribers:', err))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Failed to create lead:', err)
    return NextResponse.json(
      { error: 'Не удалось отправить заявку. Попробуйте позже.' },
      { status: 500 },
    )
  }
}
