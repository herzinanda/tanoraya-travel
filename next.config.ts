import type { NextConfig } from "next";

function getStrapiHostname(): string {
  const url = process.env.STRAPI_API_URL ?? 'http://127.0.0.1:1337'
  try { return new URL(url).hostname } catch { return '127.0.0.1' }
}

function getStrapiProtocol(): 'http' | 'https' {
  const url = process.env.STRAPI_API_URL ?? 'http://127.0.0.1:1337'
  return url.startsWith('https') ? 'https' : 'http'
}

function getStrapiPort(): string {
  const url = process.env.STRAPI_API_URL ?? 'http://127.0.0.1:1337'
  try { return new URL(url).port } catch { return '1337' }
}

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/uploads/**' },
      // { protocol: 'http', hostname: '127.0.0.1', port: '1337', pathname: '/uploads/**' },
      // {
      //   protocol: 'http',
      //   hostname: '83.147.38.39',
      //   port: '1338',
      //   pathname: '/**',
      // },
      // Production: auto-resolved from STRAPI_API_URL env var
      { protocol: getStrapiProtocol(), hostname: getStrapiHostname(), port: getStrapiPort(), pathname: '/uploads/**' },
    ],
  },
};

export default nextConfig;
