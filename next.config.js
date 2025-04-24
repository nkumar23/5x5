/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const repoName = '5x5_web';
const basePath = isProduction ? `/${repoName}` : '';

const nextConfig = {
  ...(isProduction ? { output: 'export' } : {}),
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages
  trailingSlash: true,
  // Configure base URL for production
  env: {
    siteUrl: isProduction 
      ? `https://nkumar23.github.io/${repoName}`
      : 'http://localhost:3000'
  },
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    domains: ['nkumar23.github.io'],
  },
  // Ensure static assets are handled correctly
  webpack: (config) => {
    if (isProduction) {
      config.output.publicPath = `${basePath}/`;
    }
    return config;
  },
}

module.exports = nextConfig 