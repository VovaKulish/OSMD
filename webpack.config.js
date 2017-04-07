/*
 * Created on 18.01.16.
 */
 
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var config = {

  // Gives you sourcemaps without slowing down rebundling
  devtool: 'source-map',
  entry: {
    app: "./app.js",
    vendor: ["react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux"
    ]
  },

  output: {
    path: path.join(__dirname, "assets"),
    publicPath: '/',
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },
      {
        test: /\.otf$/,
        loader: 'url?limit=20000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|gif|mp4|svg)$/,
        loader: "url?limit=25000"
      },
    ]
  },

  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Main page',
      template: __dirname + "/index.html",
      //favicon: './assets/logo.svg',
      hash: true,
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

   devServer: {
    contentBase: path.join(__dirname, "dist"),
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 5555,
   }
};

module.exports = config;
