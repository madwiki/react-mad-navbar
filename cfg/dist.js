'use strict';

let path = require('path');
let webpack = require('webpack');
let assign = require('assign-deep');
const srcPath = path.join(__dirname, '/../src');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');


// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

config.module.preLoaders[0].include = srcPath;
config.output = {
  path: path.join(__dirname,'/../dist'),
  filename: 'index.js',
  library: 'MadNav',
  libraryTarget: 'umd'
};

config.externals = [
  'react',
  'react-router',
  'react-svg-morph',
  'react/lib/ReactCSSTransitionGroup'
];
config.resolve.alias = {
  actions: `${srcPath}/actions/`,
  components: `${srcPath}/components/`,
  sources: `${srcPath}/sources/`,
  stores: `${srcPath}/stores/`,
  styles: `${srcPath}/styles/`,
  config: `${srcPath}/config/` + process.env.REACT_WEBPACK_ENV
};

module.exports = config;
