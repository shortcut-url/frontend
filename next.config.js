const path = require('path');
const withOffline = require('next-offline');

module.exports = {
  webpack: config => {
    config.resolve.alias['components'] = path.join(
      __dirname,
      'src',
      'components'
    );

    return config;
  },
  withOffline
};
