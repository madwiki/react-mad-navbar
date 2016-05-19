'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [path.join(__dirname, '/../dist')];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../example_dist/assets'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './example/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.examplePath}/actions/`,
      components: `${defaultSettings.examplePath}/components/`,
      sources: `${defaultSettings.examplePath}/sources/`,
      stores: `${defaultSettings.examplePath}/stores/`,
      styles: `${defaultSettings.examplePath}/styles/`,
      config: `${defaultSettings.examplePath}/config/` + process.env.REACT_WEBPACK_ENV
    }
  },
  module: {}
};
