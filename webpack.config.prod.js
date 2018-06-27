const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: './client/index.html',
//   filename: 'index.html',
//   inject: 'body'
// });

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'client/index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/build'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env', 'stage-2'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {}
          }
        ]
      },
    ]
  },
  plugins: [
    // HtmlWebpackPluginConfig,
    new UglifyJSPlugin({
      sourceMap: true
    }),
  ],
};
