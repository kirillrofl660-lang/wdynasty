export const COOKIE_CONSENT_KEY = 'wd-cookie-consent'
export const CONSENT_EVENT = 'wd-cookie-consent'

export type CookieConsent = 'accepted' | 'declined'

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    return value === 'accepted' || value === 'declined' ? value : null
  } catch {
    return null
  }
}

export function setCookieConsent(value: CookieConsent): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(CONSENT_EVENT))
}
