import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
            }}
          >
            WD
          </div>
        </div>
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          Династия Разработчиков
        </h1>
        <p
          style={{
            fontSize: '32px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Корпоративная разработка — 1С-Битрикс, Laravel, React, Next.js
        </p>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
          }}
        >
          {['1С-Битрикс', 'Laravel', 'React', 'DevOps'].map((tag) => (
            <span
              key={tag}
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '10px 20px',
                borderRadius: '100px',
                fontSize: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
