import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["utfs.io"],
  },
  eslint : {
        ignoreDuringBuilds: true,
  }
};

export default nextConfig;
