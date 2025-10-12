import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/buscaronis-game',
  assetPrefix: '/buscaronis-game/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
