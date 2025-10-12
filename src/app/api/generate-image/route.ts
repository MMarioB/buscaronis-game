import { NextRequest, NextResponse } from 'next/server';
import satori from 'satori';
import type { ReactElement } from 'react';
import { html } from 'satori-html';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    // 1. Cargar las fuentes
    const knockoutPath = path.join(
      process.cwd(),
      'public',
      'fonts',
      'Knockout-HTF72-FullCruiserwt.woff2'
    );
    const futuraPath = path.join(process.cwd(), 'public', 'fonts', 'futura.woff2');

    const knockoutFontData = await fs.readFile(knockoutPath);
    const futuraFontData = await fs.readFile(futuraPath);

    // 2. Obtener los parámetros de la URL
    const { searchParams } = new URL(req.url);
    const score = searchParams.get('score') ?? '0';
    const accuracy = searchParams.get('accuracy') ?? '0';
    const difficulty = searchParams.get('difficulty') ?? 'EASY';

    // 3. Definir la estructura de la imagen
    const template = html(`
      <div style="font-family: 'Futura'; display: flex; width: 1200px; height: 630px; flex-direction: column; justify-content: space-between; align-items: center; padding: 48px; color: white; background: #1a0429; position: relative;">
        <div style="position: absolute; inset: 0; width: 100%; height: 100%; background: linear-gradient(to bottom right, #23053A, #000000);"></div>
        <div style="position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.05; background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E');"></div>
        
        <div style="display: flex; flex-direction: column; align-items: center; z-index: 10;">
          <h1 style="font-family: 'Knockout'; font-size: 96px; font-weight: 900; margin: 0; text-shadow: 0 0 20px #FF6B9D;">BUSCARONIS</h1>
          <p style="font-size: 48px; margin: 0; opacity: 0.8;">Ron Barceló × Desalía</p>
        </div>

        <div style="width: 320px; height: 320px; border-radius: 50%; border: 4px solid #FF6B9D; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 0 30px #FF6B9D; z-index: 10;">
          <p style="font-family: 'Knockout'; font-size: 120px; font-weight: 900; margin: 0;">${score}</p>
          <p style="font-size: 36px; letter-spacing: 0.1em; margin: 0; opacity: 0.7;">PUNTOS</p>
        </div>

        <div style="width: 100%; display: flex; justify-content: center; gap: 32px; z-index: 10;">
          <div style="width: 256px; height: 96px; display: flex; align-items: center; justify-content: center; gap: 16px; background: rgba(255, 255, 255, 0.1); border-radius: 16px; border: 2px solid #FF6B9D; box-shadow: 0 0 15px #FF6B9D;">
            <p style="font-size: 60px; margin: 0;">🎯</p>
            <p style="font-size: 60px; font-weight: 700; margin: 0;">${accuracy}%</p>
          </div>
          <div style="width: 256px; height: 96px; display: flex; align-items: center; justify-content: center; gap: 16px; background: rgba(255, 255, 255, 0.1); border-radius: 16px; border: 2px solid #FF6B9D; box-shadow: 0 0 15px #FF6B9D;">
            <p style="font-size: 60px; margin: 0;">⚡️</p>
            <p style="font-size: 60px; font-weight: 700; margin: 0;">${difficulty}</p>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; z-index: 10;">
            <p style="text-shadow: 0 0 15px #4ECDC4; font-size: 48px; font-weight: 700; margin: 0;">¿PUEDES SUPERARME? 🏆</p>
        </div>
      </div>
    `);

    // 4. Generar el SVG con Satori
    const svg = await satori(template as unknown as ReactElement, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Knockout', data: knockoutFontData, weight: 900, style: 'normal' },
        { name: 'Futura', data: futuraFontData, weight: 400, style: 'normal' },
      ],
    });

    // 5. Convertir SVG a PNG
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    if (!pngBuffer || pngBuffer.length < 100) {
      throw new Error('PNG buffer is empty or too small.');
    }

    // 6. Retornar la respuesta con NextResponse
    return new NextResponse(pngBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error generating image (check fonts/paths):', error);
    return new NextResponse('Error generating image', { status: 500 });
  }
}
