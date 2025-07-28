import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    dirs: [
      "app",
      "components",
      "containers",
      "utils",
      "services",
      "hooks",
      "store",
    ],
  },
};

export default nextConfig;
