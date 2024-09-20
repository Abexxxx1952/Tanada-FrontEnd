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
      {
        protocol: process.env.BUCKET_PROTOCOL,
        hostname: process.env.BUCKET_HOST_URL,
        pathname: process.env.BUCKET_PATH_URL,
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
