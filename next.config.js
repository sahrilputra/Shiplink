/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "base.scss";`,
    },
    rejectUnauthorized: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sla.webelectron.com',
                port: '',
                pathname: '**',

            },
        ],
    }
}

module.exports = nextConfig
