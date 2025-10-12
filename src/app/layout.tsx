import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const knockout = localFont({
  src: './fonts/Knockout-HTF72-FullCruiserwt.woff2',
  variable: '--font-knockout',
  display: 'swap',
});

const futura = localFont({
  src: './fonts/futura.woff2',
  variable: '--font-futura',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BuscaRonis - Desafía el Momento',
  description:
    '🦆 Encuentra todos los Ronis sin tocar las minas. Juega, aprende sobre Ron Barceló y gana premios con Desalía.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${knockout.variable} ${futura.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
