/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: isProduction ? 'export' : undefined,
  basePath: isProduction ? '/5x5_web' : '',
  assetPrefix: isProduction ? '/5x5_web/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig 