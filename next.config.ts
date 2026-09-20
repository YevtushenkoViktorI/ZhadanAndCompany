import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: isGitHubPages ? "/ZhadanAndCompany" : undefined,
  trailingSlash: false,
};

export default nextConfig;
