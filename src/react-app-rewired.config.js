const nodePolyfills = [
    'buffer',
    'crypto-browserify',
    'stream-browserify',
    'util'
];

const path = require('path');

module.exports = function override(config, env) {
    // Add aliases for the missing modules
    config.resolve.alias = {
        ...config.resolve.alias,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
    };

    // Fix jsonwebtoken's dependency on 'crypto' and 'stream' modules
    config.module.rules.push({
        test: /\/jsonwebtoken\//,
        loader: 'transform-loader?brfs',
        include: [path.resolve('node_modules/jsonwebtoken')],
    });

    return config;
};

