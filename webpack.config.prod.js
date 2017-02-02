const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://res.cloudinary.com/digzpkp90/image/upload/v1485611120/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'SOCKET_URL': JSON.stringify('https://cometmsg.herokuapp.com'),
        'REST_URL': JSON.stringify('https://cometmsg.herokuapp.com'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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
