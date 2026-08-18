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
      {
        source: '/account-billing/magic-link-login',
        destination: '/account-billing/sign-in-code',
        permanent: true,
      },
      {
        source: '/troubleshooting/magic-link-not-received',
        destination: '/troubleshooting/sign-in-code-not-received',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
