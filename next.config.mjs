/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cloud.appwrite.io",
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com",
            }
        ],
    },
};

export default nextConfig;
