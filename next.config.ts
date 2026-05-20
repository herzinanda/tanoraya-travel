import type { NextConfig } from "next";

function getStrapiUrl() {
  return process.env.STRAPI_API_URL ?? "http://127.0.0.1:1337";
}

function getRemotePattern() {
  try {
    const url = new URL(getStrapiUrl());

    return {
      protocol: url.protocol.replace(":", "") as "http" | "https",
      hostname: url.hostname,
      port: url.port,
      pathname: "/uploads/**",
    };
  } catch {
    return {
      protocol: "http" as const,
      hostname: "127.0.0.1",
      port: "1337",
      pathname: "/uploads/**",
    };
  }
}

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,

    remotePatterns: [
      // Local development
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },

      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },

      // Production / dynamic
      getRemotePattern(),
    ],
  },
};

export default nextConfig;