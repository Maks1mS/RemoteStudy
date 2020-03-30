const webpack = require('webpack')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('babel-preset-react-app')],
    },
  })

  config.plugins.push(new webpack.ProvidePlugin({
    'React': 'react'
  }))

  config.resolve.extensions.push('.ts', '.tsx')

  return config;
};