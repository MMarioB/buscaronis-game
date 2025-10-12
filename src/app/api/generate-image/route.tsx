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
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(255, 107, 53, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 140, 66, 0.15) 0%, transparent 50%), linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)',
            padding: '0',
            position: 'relative',
          }}
        >
          {/* Decorative corner elements */}
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '30px',
              right: '30px',
              bottom: '30px',
              border: '3px solid rgba(255, 215, 0, 0.4)',
              borderRadius: '24px',
              display: 'flex',
            }}
          />

          {/* Top Brand Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '20px',
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '10px',
              }}
            >
              <span style={{ fontSize: '60px' }}>🥃</span>
              <h1
                style={{
                  fontSize: '64px',
                  fontWeight: 'bold',
                  color: '#FFD700',
                  margin: 0,
                  fontFamily: 'Knockout',
                  textTransform: 'uppercase',
                  letterSpacing: '6px',
                  textShadow: '0 0 40px rgba(255, 215, 0, 0.6), 0 4px 8px rgba(0,0,0,0.5)',
                }}
              >
                BUSCARONIS
              </h1>
              <span style={{ fontSize: '60px' }}>🥃</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <p
                style={{
                  fontSize: '28px',
                  color: '#FFD700',
                  margin: 0,
                  fontFamily: 'Futura',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                Ron Barceló
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '2px',
                    background: 'linear-gradient(to right, transparent, #FFD700, transparent)',
                    display: 'flex',
                  }}
                />
                <p
                  style={{
                    fontSize: '20px',
                    color: '#94a3b8',
                    margin: 0,
                    fontFamily: 'Futura',
                    fontStyle: 'italic',
                  }}
                >
                  Desafía el Momento
                </p>
                <div
                  style={{
                    width: '60px',
                    height: '2px',
                    background: 'linear-gradient(to right, #FFD700, transparent)',
                    display: 'flex',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Score Display */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 215, 0, 0.15)',
              padding: '30px 70px',
              borderRadius: '20px',
              border: '3px solid #FFD700',
              marginBottom: '30px',
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.1)',
              zIndex: 1,
            }}
          >
            <p
              style={{
                fontSize: '26px',
                color: '#FFD700',
                margin: '0 0 8px 0',
                fontFamily: 'Futura',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Puntuación Final
            </p>
            <p
              style={{
                fontSize: '110px',
                fontWeight: 'bold',
                color: '#FFD700',
                margin: 0,
                fontFamily: 'Knockout',
                textShadow: '0 0 30px rgba(255, 215, 0, 0.8)',
                lineHeight: 1,
              }}
            >
              {score}
            </p>
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              marginBottom: '25px',
              zIndex: 1,
            }}
          >
            {/* Correct */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                padding: '20px 35px',
                borderRadius: '16px',
                border: '2px solid #22c55e',
                minWidth: '160px',
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.2)',
              }}
            >
              <p
                style={{
                  fontSize: '52px',
                  fontWeight: 'bold',
                  color: '#22c55e',
                  margin: '0 0 4px 0',
                  fontFamily: 'Knockout',
                  lineHeight: 1,
                }}
              >
                {correctAnswers}
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: '#86efac',
                  margin: 0,
                  fontFamily: 'Futura',
                }}
              >
                ✅ Correctas
              </p>
            </div>

            {/* Wrong */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                padding: '20px 35px',
                borderRadius: '16px',
                border: '2px solid #ef4444',
                minWidth: '160px',
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)',
              }}
            >
              <p
                style={{
                  fontSize: '52px',
                  fontWeight: 'bold',
                  color: '#ef4444',
                  margin: '0 0 4px 0',
                  fontFamily: 'Knockout',
                  lineHeight: 1,
                }}
              >
                {wrongAnswers}
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: '#fca5a5',
                  margin: 0,
                  fontFamily: 'Futura',
                }}
              >
                ❌ Incorrectas
              </p>
            </div>

            {/* Streak */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(251, 146, 60, 0.15)',
                padding: '20px 35px',
                borderRadius: '16px',
                border: '2px solid #fb923c',
                minWidth: '160px',
                boxShadow: '0 0 20px rgba(251, 146, 60, 0.2)',
              }}
            >
              <p
                style={{
                  fontSize: '52px',
                  fontWeight: 'bold',
                  color: '#fb923c',
                  margin: '0 0 4px 0',
                  fontFamily: 'Knockout',
                  lineHeight: 1,
                }}
              >
                {streak}
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: '#fdba74',
                  margin: 0,
                  fontFamily: 'Futura',
                }}
              >
                🔥 Racha
              </p>
            </div>

            {/* Time */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(78, 205, 196, 0.15)',
                padding: '20px 35px',
                borderRadius: '16px',
                border: '2px solid #4ECDC4',
                minWidth: '160px',
                boxShadow: '0 0 20px rgba(78, 205, 196, 0.2)',
              }}
            >
              <p
                style={{
                  fontSize: '52px',
                  fontWeight: 'bold',
                  color: '#4ECDC4',
                  margin: '0 0 4px 0',
                  fontFamily: 'Knockout',
                  lineHeight: 1,
                }}
              >
                {time}
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: '#67e8f9',
                  margin: 0,
                  fontFamily: 'Futura',
                }}
              >
                ⏱️ Tiempo
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              marginTop: '10px',
              zIndex: 1,
            }}
          >
            <p
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#FFD700',
                margin: 0,
                fontFamily: 'Knockout',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textShadow: '0 2px 10px rgba(255, 215, 0, 0.5)',
              }}
            >
              ¿Puedes superarlo? 🎮
            </p>
            <p
              style={{
                fontSize: '20px',
                color: '#94a3b8',
                margin: 0,
                fontFamily: 'Futura',
              }}
            >
              #DesafiáElMomento #RonBarceló #BuscaRonis
            </p>
          </div>

          {/* Decorative glow effects */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              right: '10%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '10%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
              display: 'flex',
            }}
          />
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
