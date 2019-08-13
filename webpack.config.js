const path = require('path');
const mode = process.env.NODE_ENV.trim();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css'
    })
  ],
  entry: path.resolve(__dirname, 'js/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/js/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: mode === 'development' ? 
              'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    publicPath: '/js',
    compress: true,
    stats: 'errors-only',
    port: 3000
  },
  devtool: 'source-map'
};