'use strict';

let path = require('path');
let fs = require('fs');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let os = require('os');

let network = os.networkInterfaces();
let networkIp = network.en0[1].address;
// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

// function changeSuffix(htmlPath) {
//   this.htmlPath = htmlPath;
//   this.apply = function(compiler) {
//     compiler.plugin('compilation', function(compilation) {
//       var time = Date.parse(new Date());
//       var options = compilation.compiler.options;
//       var filename = options.output.filename;
//       options.output.filename = filename.slice(0,filename.indexOf('[')+1) + time + filename.slice(filename.indexOf(']'),filename.length);
//       fs.readFile(htmlPath,function (err,data) {
//         var txt = data.toString('utf8');
//         txt = txt.slice(0,txt.indexOf('[')+1) + time + txt.slice(txt.indexOf(']'),txt.length);
//         fs.writeFile(htmlPath,txt,function () {
//           console.log('html updated!',time);
//         });
//       })
//     });
//   };
// }


let config = Object.assign({}, baseConfig, {
  headers: { 'Access-Control-Allow-Origin': '*' },
  entry: [
    'webpack-dev-server/client?http://' + networkIp + ':' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    './example/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    // new changeSuffix(path.join(__dirname, '../example', 'index.html')),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules()
});
config.devServer.publicPath = '/assets/';
// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader?compact=false',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../example'),path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
