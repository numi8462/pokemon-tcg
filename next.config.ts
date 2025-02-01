import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export if you use images
    domains: ["resources.vortexgaming.io"],
  },
  output: 'export', // Enables static export

};

export default nextConfig;
