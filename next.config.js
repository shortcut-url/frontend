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
    config.resolve.alias['lib'] = path.join(__dirname, 'src', 'lib');
    config.resolve.alias['api'] = path.join(__dirname, 'src', 'api');

    return config;
  },
  env: {
    apiServer: 'http://localhost:8080'
  },
  withOffline
};
