'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { COOKIE_CONSENT_KEY, getCookieConsent } from '@/src/shared/lib/cookieConsent'

export function YandexMetrika() {
  const [accepted, setAccepted] = useState(() => getCookieConsent() === 'accepted')

  useEffect(() => {
    const check = () => setAccepted(getCookieConsent() === 'accepted')
    check()

    window.addEventListener('wd-cookie-consent', check)
    window.addEventListener('storage', check)

    return () => {
      window.removeEventListener('wd-cookie-consent', check)
      window.removeEventListener('storage', check)
    }
  }, [])

  if (!accepted) return null

  return (
    <Script
      id="yandex-metrika"
      strategy="lazyOnload"
    >{`
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();
      for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
      ym(109964523,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
    `}</Script>
  )
}
