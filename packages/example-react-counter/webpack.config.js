const path = require('path')

module.exports = {
  entry: './src/index.jsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  },

  devtool: 'source-map',
  context: __dirname,
  target: 'web',
  resolve: { symlinks: false },

  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'public'),
    compress: true
  },

  plugins: []
}
