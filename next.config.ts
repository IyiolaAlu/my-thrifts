import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // You can add a pathname pattern if you want to be more specific, e.g.:
        // pathname: '/your-cloud-name/**',
      },
    ],
  },
};

export default nextConfig;
