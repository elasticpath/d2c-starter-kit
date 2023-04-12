// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: ["files-eu.epusercontent.com", "asset1.cxnmarksandspencer.com"],
    unoptimized: process.env.NEXT_PUBLIC_DISABLE_IMAGE_OPTIMIZATION == "true",
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
