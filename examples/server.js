const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multipart = require('connect-multiparty')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const router = express.Router()
const path = require('path')

require('./server2')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname, {
  setHeaders(res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))

// 路由配置
router.get('/more/get', function(req, res) {
  res.json(req.cookies)
})

router.post('/more/upload', function(req, res) {
  console.log(req.body, req.files)
  res.end('upload success')
})

router.get('*', function(req, res) {
  res.json(req.query)
})

router.options('*', function(req, res) {
  res.json(req.query)
})

router.delete('*', function(req, res) {
  res.json(req.query)
})

router.head('*', function(req, res) {
  res.json(req.query)
})

router.post('*', function(req, res) {
  res.json(req.body)
})

router.put('*', function(req, res) {
  res.json(req.body)
})

router.patch('*', function(req, res) {
  res.json(req.body)
})

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
