module.exports = {
  publicRuntimeConfig: {
    url: process.env.URL,
  },
  serverRuntimeConfig: {
    url: process.env.SERVER_SIDE_URL || process.env.URL,
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    return config;
  },
};
