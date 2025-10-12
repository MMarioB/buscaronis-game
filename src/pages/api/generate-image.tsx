import type { NextApiRequest, NextApiResponse } from 'next';
import satori from 'satori';
import type { ReactElement } from 'react';
import { html } from 'satori-html';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const knockoutPath = path.join(
      process.cwd(),
      'public',
      'fonts',
      'Knockout-HTF72-FullCruiserwt.woff2'
    );
    const futuraPath = path.join(process.cwd(), 'public', 'fonts', 'futura.woff2');

    const knockoutFontData = await fs.readFile(knockoutPath);
    const futuraFontData = await fs.readFile(futuraPath);

    const { score, accuracy, difficulty } = req.query;

    const template = html(`
      <div style="font-family: 'Futura';" class="w-full h-full flex flex-col justify-between items-center p-12 text-white bg-[#1a0429]">
        <div class="absolute inset-0 w-full h-full bg-gradient-to-br from-[#23053A] to-[#000000]"></div>
        <div class="absolute inset-0 w-full h-full opacity-5" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E');"></div>
        
        <div class="flex flex-col items-center">
          <h1 style="font-family: 'Knockout'; text-shadow: 0 0 20px #FF6B9D;" class="text-8xl font-black">BUSCARONIS</h1>
          <p class="text-4xl opacity-80">Ron Barceló × Desalía</p>
        </div>

        <div class="w-80 h-80 rounded-full border-4 border-[#FF6B9D] flex flex-col justify-center items-center" style="box-shadow: 0 0 30px #FF6B9D;">
          <p style="font-family: 'Knockout';" class="text-9xl font-black">${score ?? 0}</p>
          <p class="text-3xl tracking-widest opacity-70">PUNTOS</p>
        </div>

        <div class="w-full flex justify-center gap-8">
          <div class="w-64 h-24 flex items-center justify-center gap-4 bg-white/10 rounded-2xl border-2 border-[#FF6B9D]" style="box-shadow: 0 0 15px #FF6B9D;">
            <p class="text-5xl">🎯</p>
            <p class="text-5xl font-bold">${accuracy ?? 0}%</p>
          </div>
          <div class="w-64 h-24 flex items-center justify-center gap-4 bg-white/10 rounded-2xl border-2 border-[#FF6B9D]" style="box-shadow: 0 0 15px #FF6B9D;">
            <p class="text-5xl">⚡️</p>
            <p class="text-5xl font-bold">${difficulty ?? 'EASY'}</p>
          </div>
        </div>
        
        <div class="flex items-center">
            <p style="text-shadow: 0 0 15px #4ECDC4;" class="text-4xl font-bold">¿PUEDES SUPERARME? 🏆</p>
        </div>
      </div>
    `);

    const svg = await satori(template as unknown as ReactElement, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Knockout', data: knockoutFontData, weight: 900, style: 'normal' },
        { name: 'Futura', data: futuraFontData, weight: 400, style: 'normal' },
        { name: 'Futura', data: futuraFontData, weight: 700, style: 'normal' },
      ],
    });

    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000');
    res.send(pngBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating image');
  }
}
