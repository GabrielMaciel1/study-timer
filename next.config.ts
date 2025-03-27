import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/timer',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
