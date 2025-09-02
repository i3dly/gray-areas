import { withContentCollections } from '@content-collections/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      new URL("https://media0.giphy.com/**"),
      new URL("https://media.giphy.com/**"),
    ],
  },
};

export default withContentCollections(config);
