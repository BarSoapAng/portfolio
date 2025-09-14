const withMDX = require('@next/mdx')();

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
};

module.exports = withMDX(nextConfig);