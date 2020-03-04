const path = require('path');
const withOffline = require('next-offline');

module.exports = {
  webpack: config => {
    config.resolve.alias['components'] = path.join(
      __dirname,
      'src',
      'components'
    );

    config.resolve.alias['models'] = path.join(__dirname, 'src', 'models');

    return config;
  },
  withOffline
};
