/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "base.scss";`,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sla.webelectron.com',
                port: '',
                pathname: '**',

            },
        ],
    },
}

module.exports = nextConfig
