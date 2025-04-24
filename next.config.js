/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/5x5_web' : '';

const nextConfig = {
  ...(isProduction ? { output: 'export' } : {}),
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages
  trailingSlash: true,
  // Ensure static assets are handled correctly
  webpack: (config) => {
    if (isProduction) {
      config.output.publicPath = `${basePath}/`;
    }
    return config;
  },
}

module.exports = nextConfig 