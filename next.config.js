// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['img.clerk.com'],
//     },
//   };

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }, 
      {
        protocol: 'http',
        hostname: '*'
      }, 
    ]
  }
}

module.exports = nextConfig