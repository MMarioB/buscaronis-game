import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      try {
        config.externals.push({
          sharp: 'commonjs sharp',
        });
      } catch (e) {
        config.externals = { sharp: 'commonjs sharp' };
        console.log(e);
      }
    }
    return config;
  },
};

export default nextConfig;
