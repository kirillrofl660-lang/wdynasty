const TELEGRAM_API = 'https://api.telegram.org'

function getToken(): string | null {
  return process.env.TELEGRAM_BOT_TOKEN || null
}

/**
 * Отправка сообщения одному чату через Telegram Bot API.
 * Возвращает true при успехе. Ошибки логируются, но не бросаются,
 * чтобы рассылка не падала целиком из-за одного получателя.
 */
export async function sendTelegramMessage(
  chatId: string | number,
  text: string,
): Promise<boolean> {
  const token = getToken()
  if (!token) {
    console.warn('TELEGRAM_BOT_TOKEN не задан — сообщение не отправлено')
    return false
  }

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      console.error(`Telegram sendMessage failed (chat ${chatId}):`, data)
      return false
    }
    return true
  } catch (err) {
    console.error(`Telegram sendMessage error (chat ${chatId}):`, err)
    return false
  }
}

/** Экранирование под HTML parse_mode Telegram */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
