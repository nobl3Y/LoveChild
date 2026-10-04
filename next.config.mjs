/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@mysten-incubation/memwal'],
  },
};

export default nextConfig;
