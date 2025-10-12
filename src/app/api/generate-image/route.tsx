import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Cargar las fuentes
const futuraFont = fetch(new URL('../../../../public/fonts/futura.woff', import.meta.url)).then(
  (res) => res.arrayBuffer()
);

const knockoutFont = fetch(
  new URL('../../../../public/fonts/Knockout-HTF72-FullCruiserwt.woff', import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const score = searchParams.get('score') || '0';
    const correctAnswers = searchParams.get('correct') || '0';
    const wrongAnswers = searchParams.get('wrong') || '0';
    const time = searchParams.get('time') || '0:00';
    const streak = searchParams.get('streak') || '0';

    const [futuraData, knockoutData] = await Promise.all([futuraFont, knockoutFont]);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            padding: '60px',
            position: 'relative',
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '4px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '24px',
              display: 'flex',
            }}
          />

          {/* Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '40px',
              zIndex: 1,
            }}
          >
            {/* Title */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <h1
                style={{
                  fontSize: '72px',
                  fontWeight: 'bold',
                  color: '#FFD700',
                  margin: 0,
                  fontFamily: 'Knockout',
                  textTransform: 'uppercase',
                  letterSpacing: '4px',
                  textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
                }}
              >
                BUSCARONIS
              </h1>
              <p
                style={{
                  fontSize: '28px',
                  color: '#94a3b8',
                  margin: 0,
                  fontFamily: 'Futura',
                }}
              >
                Resultados del Juego
              </p>
            </div>

            {/* Score Display */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                padding: '40px 80px',
                borderRadius: '20px',
                border: '3px solid #FFD700',
              }}
            >
              <p
                style={{
                  fontSize: '32px',
                  color: '#cbd5e1',
                  margin: '0 0 12px 0',
                  fontFamily: 'Futura',
                }}
              >
                Puntuación Final
              </p>
              <p
                style={{
                  fontSize: '96px',
                  fontWeight: 'bold',
                  color: '#FFD700',
                  margin: 0,
                  fontFamily: 'Knockout',
                }}
              >
                {score}
              </p>
            </div>

            {/* Stats Grid */}
            <div
              style={{
                display: 'flex',
                gap: '32px',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              {/* Correct */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  padding: '24px 40px',
                  borderRadius: '16px',
                  border: '2px solid #22c55e',
                  minWidth: '180px',
                }}
              >
                <p
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#22c55e',
                    margin: '0 0 8px 0',
                    fontFamily: 'Knockout',
                  }}
                >
                  {correctAnswers}
                </p>
                <p
                  style={{
                    fontSize: '20px',
                    color: '#86efac',
                    margin: 0,
                    fontFamily: 'Futura',
                  }}
                >
                  Correctas
                </p>
              </div>

              {/* Wrong */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  padding: '24px 40px',
                  borderRadius: '16px',
                  border: '2px solid #ef4444',
                  minWidth: '180px',
                }}
              >
                <p
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#ef4444',
                    margin: '0 0 8px 0',
                    fontFamily: 'Knockout',
                  }}
                >
                  {wrongAnswers}
                </p>
                <p
                  style={{
                    fontSize: '20px',
                    color: '#fca5a5',
                    margin: 0,
                    fontFamily: 'Futura',
                  }}
                >
                  Incorrectas
                </p>
              </div>

              {/* Streak */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'rgba(251, 146, 60, 0.1)',
                  padding: '24px 40px',
                  borderRadius: '16px',
                  border: '2px solid #fb923c',
                  minWidth: '180px',
                }}
              >
                <p
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#fb923c',
                    margin: '0 0 8px 0',
                    fontFamily: 'Knockout',
                  }}
                >
                  {streak}
                </p>
                <p
                  style={{
                    fontSize: '20px',
                    color: '#fdba74',
                    margin: 0,
                    fontFamily: 'Futura',
                  }}
                >
                  Racha
                </p>
              </div>
            </div>

            {/* Time */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '12px',
              }}
            >
              <p
                style={{
                  fontSize: '24px',
                  color: '#94a3b8',
                  margin: 0,
                  fontFamily: 'Futura',
                }}
              >
                ⏱️ Tiempo:
              </p>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#cbd5e1',
                  margin: 0,
                  fontFamily: 'Knockout',
                }}
              >
                {time}
              </p>
            </div>

            {/* Footer */}
            <p
              style={{
                fontSize: '22px',
                color: '#64748b',
                margin: '24px 0 0 0',
                fontFamily: 'Futura',
              }}
            >
              ¿Puedes superarlo? 🎮
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Futura',
            data: futuraData,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Knockout',
            data: knockoutData,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}
