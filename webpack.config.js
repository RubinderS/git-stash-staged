const path = require('path'),
  webpack = require('webpack'),
  {CleanWebpackPlugin} = require('clean-webpack-plugin'),
  nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'inline-source-map',
  target: 'node',

  entry: {
    index: ['./src/index.ts'],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    globalObject: 'this',
    library: {name: 'git-stash-staged', type: 'umd'},
  },

  externals: [nodeExternals()],

  resolve: {
    extensions: ['.ts'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{loader: 'ts-loader'}, {loader: 'shebang-loader'}],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({banner: '#!/usr/bin/env node', raw: true}),
  ],
};
