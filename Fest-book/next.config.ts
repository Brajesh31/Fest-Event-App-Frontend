/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  experimental: {
    serverActions: {}, // Ensure this is an object, not a boolean
    
  },
};

export default nextConfig;
