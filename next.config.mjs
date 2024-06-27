/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      cssProp: true,
      ssr: true,
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
      },
    ],
  },
};

export default nextConfig;
