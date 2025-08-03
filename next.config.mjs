/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Use Node.js runtime for API routes to support streaming
    serverComponentsExternalPackages: [],
  },
  // Ensure API routes use Node.js runtime (not Edge)
  async rewrites() {
    return [];
  },
};

export default nextConfig;