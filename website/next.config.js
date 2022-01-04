const path = require('path')

const shouldPrefix = process.env.PREFIX === 'true'

/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: shouldPrefix ? '/react-runner/' : '',
  basePath: shouldPrefix ? '/react-runner' : '',
  experimental: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  reactStrictMode: true,
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-runner': path.resolve(__dirname, '../packages/react-runner'),
      'react-live-runner': path.resolve(
        __dirname,
        '../packages/react-live-runner'
      ),
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
    // Important: return the modified config
    return config
  },
}
