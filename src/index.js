/* eslint-disable no-console, prefer-template */

import path from 'path'
import chalk from 'chalk'
import defaults from 'lodash/defaults'
import webpack from 'webpack'
import openBrowser from 'react-dev-utils/openBrowser'
import { choosePort, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils'
import errorOverlayMiddleware from 'react-error-overlay/middleware'
import WebpackDevServer from 'webpack-dev-server'
import createCompiler from './createCompiler'
import addEntriesToConfig from './addEntriesToConfig'

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const setup = (config, params) => {
  if (!config) {
    console.log(chalk.red('webpack config is missing.'))
    return
  }

  const options = defaults(params, {
    port: process.env.PORT || 8080,
    hostname: process.env.HOSTNAME || 'localhost',
    publicPath: config.output.publicPath,
    contentBase: process.env.CONTENT_BASE || path.resolve('public'),
    https: process.env.HTTPS,
  })

  choosePort(null, options.port)
    .then(port => {
      if (port == null) {
        process.exit()
      }

      const modifiedConfig = {
        ...addEntriesToConfig(
          config,
          require.resolve('react-dev-utils/webpackHotDevClient'),
          require.resolve('react-error-overlay'),
        ),
        plugins: [...(config.plugins || []), new webpack.HotModuleReplacementPlugin()],
      }

      const urls = prepareUrls(options.https ? 'https' : 'http', process.env.HOST || '::', port)
      const compiler = createCompiler(modifiedConfig, urls)

      const devServer = new WebpackDevServer(compiler, {
        clientLogLevel: 'none',
        compress: true,
        hot: true,
        quiet: true,
        publicPath: options.publicPath,
        contentBase: options.contentBase,
        watchContentBase: true,
        overlay: false,
        historyApiFallback: options.historyApiFallback || !options.server,
        https: options.https,
        setup: app => {
          app.use(errorOverlayMiddleware())

          if (options.server) {
            app.use(options.server)
          }
        },
        watchOptions: {
          ignored: /node_modules/,
        },
        proxy: options.proxy,
      })

      devServer.listen(port, error => {
        if (error) {
          console.log(error)
          return
        }

        console.log(chalk.cyan('Starting development server...'))
        openBrowser(urls.localUrlForBrowser)
      })

      Array.of('SIGINT', 'SIGTERM').forEach(sig => {
        process.on(sig, () => {
          devServer.close()
          process.exit()
        })
      })
    })
    .catch(error => {
      if (error && error.message) {
        console.log(error.message)
      }

      process.exit(1)
    })
}

export default setup
