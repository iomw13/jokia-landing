const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jokia.agency",
      },
      {
        protocol: "https",
        hostname: "prod.spline.design",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  compress: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
