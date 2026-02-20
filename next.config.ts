const nextConfig = {
  compress: true,
  productionBrowserSourceMaps: false,
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
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  webpack: (
    config: any,
    { dev, isServer }: { dev: boolean; isServer: boolean },
  ) => {
    if (!dev && !isServer) {
      config.optimization = config.optimization || {};
      config.optimization.usedExports = true;
      config.optimization.splitChunks = {
        ...(config.optimization.splitChunks || {}),
        chunks: "all",
        cacheGroups: {
          ...(config.optimization.splitChunks?.cacheGroups || {}),
          default: false,
          vendors: false,
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          framer: {
            name: "framer",
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 30,
          },
        },
      };
    }

    return config;
  },
  turbopack: {},
};

export default nextConfig;
