import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const score = searchParams.get('score') ?? '0';
    const accuracy = searchParams.get('accuracy') ?? '0';
    const difficulty = searchParams.get('difficulty') ?? 'EASY';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '48px',
            color: 'white',
            background: 'linear-gradient(to bottom right, #23053A, #000000)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1
              style={{
                fontSize: '96px',
                fontWeight: 900,
                margin: 0,
              }}
            >
              BUSCARONIS
            </h1>
            <p style={{ fontSize: '48px', margin: 0, opacity: 0.8 }}>Ron Barceló × Desalía</p>
          </div>

          {/* Score Circle */}
          <div
            style={{
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              border: '4px solid #FF6B9D',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 0 30px #FF6B9D',
            }}
          >
            <p style={{ fontSize: '120px', fontWeight: 900, margin: 0 }}>{score}</p>
            <p style={{ fontSize: '36px', letterSpacing: '0.1em', margin: 0, opacity: 0.7 }}>
              PUNTOS
            </p>
          </div>

          {/* Stats */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '32px' }}>
            <div
              style={{
                width: '256px',
                height: '96px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                border: '2px solid #FF6B9D',
              }}
            >
              <p style={{ fontSize: '60px', margin: 0 }}>🎯</p>
              <p style={{ fontSize: '60px', fontWeight: 700, margin: 0 }}>{accuracy}%</p>
            </div>
            <div
              style={{
                width: '256px',
                height: '96px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                border: '2px solid #FF6B9D',
              }}
            >
              <p style={{ fontSize: '60px', margin: 0 }}>⚡️</p>
              <p style={{ fontSize: '60px', fontWeight: 700, margin: 0 }}>{difficulty}</p>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ fontSize: '48px', fontWeight: 700, margin: 0 }}>¿PUEDES SUPERARME? 🏆</p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
