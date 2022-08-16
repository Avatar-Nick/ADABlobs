/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
    //output: 'standalone',
    //output: process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? null : 'standalone',
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.experiments.asyncWebAssembly = true;
      config.module.exprContextCritical = false;
      return config;
    },
    images: {
        domains: ['ipfs.io', 'ipfs.blockfrost.dev'],
    }, 
  }
  
  module.exports = nextConfig