import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i2c.seadn.io",
      },
      {
        protocol: "https",
        hostname: "i.seadn.io",
      },
    ],
  },
};

export default nextConfig;
