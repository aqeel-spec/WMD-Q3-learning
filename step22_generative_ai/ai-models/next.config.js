/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/ddj5gisb3/image/upload/**',
            },
        ],
    },
}

module.exports = nextConfig
// (https://res.cloudinary.com/ddj5gisb3/image/upload/v1696680964/Nextjs%20AI%20generated%20images/Jeans.png.jpg)