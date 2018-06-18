const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  mode: (process.env.NODE_ENV || 'production'),
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
});
