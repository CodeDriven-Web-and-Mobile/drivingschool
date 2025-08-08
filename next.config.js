/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // For static hosting, we need to disable image optimization
  images: {
    unoptimized: true,
  },
  // Disable trailing slashes for cleaner URLs
  trailingSlash: false,
  // Set the base path if you're not hosting at the root
  // basePath: '',
};

module.exports = nextConfig;
