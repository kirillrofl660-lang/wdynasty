type Bucket = {
  count: number
  resetAt: number
}

const store = new Map<string, Bucket>()

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

/**
 * Простой in-memory rate limiter по ключу (обычно IP).
 * Подходит для одного инстанса приложения. Для горизонтального
 * масштабирования нужен общий стор (Redis и т.п.).
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now()
  const bucket = store.get(key)

  if (!bucket || now > bucket.resetAt) {
    const resetAt = now + windowMs
    store.set(key, { count: 1, resetAt })
    return { allowed: true, remaining: limit - 1, resetAt }
  }

  bucket.count += 1
  const allowed = bucket.count <= limit
  return {
    allowed,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
  }
}

// Периодическая очистка устаревших бакетов, чтобы Map не рос бесконечно
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, bucket] of store.entries()) {
      if (now > bucket.resetAt) store.delete(key)
    }
  }, 60_000).unref?.()
}
