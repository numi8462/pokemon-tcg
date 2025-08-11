import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resources.vortexgaming.io',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
