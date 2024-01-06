/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'velog.velcdn.com',
			},
			{
				protocol: 'https',
				hostname: 'images.velog.io',
			},
		],
	},
};

module.exports = nextConfig;
