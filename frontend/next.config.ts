import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  logging: { level: "silent" } as any,
  turbopack: {},
  experimental: {
    allowedDevOrigins: ["*"],
  } as any,
};

export default nextConfig;
