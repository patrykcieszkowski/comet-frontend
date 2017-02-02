'use strict'
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config.dev')

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(7770, 'localhost', (err) => {
  if (err)
  {
    return console.log(err)
  }

  console.log('Listening at http://localhost:7770')
})
