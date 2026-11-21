
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const basePath = isGitHubPages ? "/wirza-profile" : "";

const nextConfig = {
  basePath,
  ...(basePath ? { assetPrefix: basePath } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
