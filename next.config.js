/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  // next.js config
})

const nextConfig = {
  images: {
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net",
      "res.cloudinary.com",
      "sb.kaleidousercontent.com",
      "cdn.icon-icons.com"
    ]
  }
}

module.exports = nextConfig
