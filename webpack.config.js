const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/public');
const APP_DIR = path.resolve(__dirname, 'client/app');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?http://localhost:5000/',
    'webpack/hot/dev-server',
    'whatwg-fetch', 
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,    
    publicPath : '/public/',
    filename: 'bundle.js'
  },
  devtool : 'inline-source-map',
  devServer : {
    hot : true,
    inline : true,
    contentBase : BUILD_DIR,
    publicPath : '/public/'
  },
  plugins : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        loader : 'babel-loader',
        include : APP_DIR,
        exclude : /node_modules/ ,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};