import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: false,
  output: 'export',      // Add this
  images: {
    unoptimized: true,   // Add this
  },
};

export default nextConfig;
