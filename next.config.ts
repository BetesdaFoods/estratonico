import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "z2pxzs1xdaiebjy2.public.blob.vercel-storage.com",
			},
		],
	},
};

export default nextConfig;
