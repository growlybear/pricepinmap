import Koa from 'koa'
import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import _debug from 'debug'
import config from '../config'
import webpackProxyMiddleware from './middleware/webpack-proxy'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'

const debug = _debug('app:server')
const paths = config.utils_paths
const app = new Koa()

app.use(convert(historyApiFallback({
  verbose: false
})))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  if (config.proxy && config.proxy.enabled) {
    const options = config.proxy.options
    app.use(convert(webpackProxyMiddleware(options)))
  }

  app.use(webpackDevMiddleware(compiler, publicPath))
  app.use(webpackHMRMiddleware(compiler))

  app.use(convert(serve(paths.client('static'))))
} else {
  debug(
    'Server is being run outside of live development mode.'
  )

  app.use(convert(serve(paths.base(config.dir_dist))))
}

export default app
