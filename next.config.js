/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.SITE_PROTOCOL,
        hostname: process.env.SITE_URL,
        port: process.env.SITE_PORT,
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
