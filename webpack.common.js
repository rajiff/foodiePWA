const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const PwaManifestWebpackPlugin = require('pwa-manifest-webpack-plugin');
const pwaManifestJSON = require('./src/manifest.json');

module.exports = {
  entry: './src/index.js',
    module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // loaders: "eslint-loader",
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loaders: 'style-loader!css-loader?modules',
        exclude: '/node_modules/'
      },
      {
        test: /(\.scss|\.css)$/,
        loader: 'style!css?modules!sass',
        include: path.resolve(__dirname, 'react-flexbox-grid'),
        exclude: /(node_modules)/
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("1.0.0")
    }),
    new HtmlWebpackPlugin({
      title: 'AppTemplate',
      template: './public/index.html',
      favicon: './public/favicon.ico'
      // inject: 'body'
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
      include: [/\.html$/, /\.js$/,/\.css$/,/\.ico$/,/\.json$/]
    }),
    new PwaManifestWebpackPlugin(pwaManifestJSON)
  ],
  output: {
     filename: '[hash].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     publicPath: '/'
  }
};