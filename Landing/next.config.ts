import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'export',      // <--- Add this
  images: {
    unoptimized: true,   // <--- Add this (required for static export)
  },
};

export default nextConfig;
