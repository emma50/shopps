/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'ae01.alicdn.com'
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: '@import "./base.scss";'
  },
}

module.exports = nextConfig
