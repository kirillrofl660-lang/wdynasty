import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramMessage } from '@/src/shared/lib/telegram'

/**
 * Webhook Telegram-бота: обрабатывает /start (подписка) и /stop (отписка).
 * Защищён секретом из заголовка X-Telegram-Bot-Api-Secret-Token,
 * который задаётся при setWebhook.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (secret && req.headers.get('x-telegram-bot-api-secret-token') !== secret) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  let update: any
  try {
    update = await req.json()
  } catch {
    return NextResponse.json({ ok: true })
  }

  const message = update?.message
  const chat = message?.chat
  const text: string = typeof message?.text === 'string' ? message.text.trim() : ''

  if (!chat?.id || !text) return NextResponse.json({ ok: true })

  const chatId = String(chat.id)
  const command = text.split(/\s+/)[0].toLowerCase().replace(/@.*$/, '')

  try {
    const payload = await getPayload({ config })

    const existing = await payload.find({
      collection: 'tg-subscribers',
      where: { chatId: { equals: chatId } },
      limit: 1,
      overrideAccess: true,
    })

    if (command === '/start') {
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'tg-subscribers',
          data: {
            chatId,
            username: chat.username || message.from?.username || '',
            firstName: chat.first_name || message.from?.first_name || '',
            isActive: true,
          },
          overrideAccess: true,
        })
      } else {
        await payload.update({
          collection: 'tg-subscribers',
          id: existing.docs[0].id,
          data: { isActive: true },
          overrideAccess: true,
        })
      }
      await sendTelegramMessage(
        chatId,
        '✅ Вы подписаны на уведомления о новых заявках.\nЧтобы отписаться — отправьте /stop',
      )
    } else if (command === '/stop') {
      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'tg-subscribers',
          id: existing.docs[0].id,
          data: { isActive: false },
          overrideAccess: true,
        })
      }
      await sendTelegramMessage(
        chatId,
        '🔕 Вы отписались от уведомлений.\nЧтобы снова подписаться — отправьте /start',
      )
    } else {
      await sendTelegramMessage(
        chatId,
        'Команды:\n/start — подписаться на заявки\n/stop — отписаться',
      )
    }
  } catch (err) {
    console.error('Telegram webhook error:', err)
  }

  // Telegram ждёт 200, иначе будет повторять доставку
  return NextResponse.json({ ok: true })
}
