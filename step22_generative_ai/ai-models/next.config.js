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
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
                port: '',
                pathname: '/free-vector/**',
            }
        ],
    },
}

module.exports = nextConfig
// (https://res.cloudinary.com/ddj5gisb3/image/upload/v1696680964/Nextjs%20AI%20generated%20images/Jeans.png.jpg)
// https://www.google.com/imgres?imgurl=
// https://img.freepik.com/free-vector/artificial-intelligence-concept-design-with-face_1017-18296.jpg?w=996&t=st=1697439178~exp=1697439778~hmac=3b2a9603cc89f568da86061342dd98649ccbd5ed55d37c1f22ef7a4c18d4e549