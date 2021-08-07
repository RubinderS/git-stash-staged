const path = require('path'),
  webpack = require('webpack'),
  nodeExternals = require('webpack-node-externals'),
  version = require('./package.json').version;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'inline-source-map',

  entry: {
    index: ['./src/index.ts'],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    globalObject: 'this',
    library: {name: 'git-stash-staged', type: 'umd'},
  },

  externalsPresets: {node: true},
  externals: [nodeExternals()],

  resolve: {
    extensions: ['.ts'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{loader: 'ts-loader'}],
      },
    ],
  },

  plugins: [
    new webpack.CleanPlugin(),
    new webpack.EnvironmentPlugin({version}),
    new webpack.BannerPlugin({banner: '#!/usr/bin/env node', raw: true}),
  ],
};
