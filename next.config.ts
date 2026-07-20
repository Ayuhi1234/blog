import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
    ],
  },
  redirects: async () => [
    { source: "/feed", destination: "/rss.xml", permanent: true },
  ],
};

export default withContentCollections(nextConfig);
