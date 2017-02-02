const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'SOCKET_URL': JSON.stringify('http://localhost:3000'),
        'REST_URL': JSON.stringify('http://localhost:3000'),
      }
    }),
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    },
    // CSS
    {
      test: /\.sass$/,
      include: path.join(__dirname, 'client'),
      loader: 'style-loader!css-loader!sass-loader'
    },
    // img, sounds
    {
      test: /\.(jpe?g|png|gif|svg|mp3)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
      ]
    }
  ]
  }
}
