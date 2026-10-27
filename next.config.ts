import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_OPENROUTER_API_KEY: process.env.NEXT_OPENROUTER_API_KEY,
    NEXT_OPENROUTER_MODEL: process.env.NEXT_OPENROUTER_MODEL,
  },
};

export default nextConfig;
