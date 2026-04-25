/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  // Sanity Studio import một số package CommonJS, cần transpile để build OK trên Vercel
  experimental: {
    // Cho phép server actions / external packages
  },
}

module.exports = nextConfig
