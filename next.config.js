/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/5x5_web' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/5x5_web/' : '',
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages
  trailingSlash: true,
}

module.exports = nextConfig 