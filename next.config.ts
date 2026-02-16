import { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	// Enable standalone output for optimized Docker builds
	// This creates a minimal server with only necessary dependencies
	output: "standalone",

	// Ignore ESLint errors during build (fix them separately)
	eslint: {
		ignoreDuringBuilds: true,
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
