/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/5x5_web',
  assetPrefix: '/5x5_web/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig 