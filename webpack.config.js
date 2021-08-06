const path = require('path'),
  {CleanWebpackPlugin} = require('clean-webpack-plugin'),
  nodeExternals = require('webpack-node-externals'),
  NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const isProduction =
  typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'inline-source-map',

  entry: {
    index: ['./src/index.ts'],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    libraryTarget: '', // keeps the exports of the library
    globalObject: 'this',
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

  plugins: [new CleanWebpackPlugin(), new NodePolyfillPlugin()],
};
