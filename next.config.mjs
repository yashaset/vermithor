/** @type {import('next').NextConfig} */
const nextConfig = {
  // Devlog photos are hot-linked from Unsplash, as their guidelines ask.
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

export default nextConfig;
