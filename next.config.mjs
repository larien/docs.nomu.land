import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/trips/navi-nudge',
        destination: '/trips/navi-trips-gaps',
        permanent: true,
      },
      {
        source: '/getting-started/installing-nomu-pwa',
        destination: '/getting-started/getting-the-app',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
