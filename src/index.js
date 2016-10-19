import path from 'path'
import invariant from 'invariant'
import defaults from 'lodash/defaults'
import clearConsole from 'react-dev-utils/clearConsole'
import openBrowser from 'react-dev-utils/openBrowser'
import WebpackDevServer from 'webpack-dev-server'
import createCompiler from './createCompiler'
import includeClientEntry from './includeClientEntry'

const setup = params => {
  const options = defaults(params, {
    port: process.env.PORT || 8080,
    hostname: process.env.HOSTNAME || 'localhost',
    https: false,
  })

  invariant(options.config, 'webpack config is missing.')

  const url = `${options.https ? 'https' : 'http'}://${options.hostname}:${options.port}`
  const config = includeClientEntry(options.config)
  const compiler = createCompiler(config, url)

  const devServer = new WebpackDevServer(compiler, {
    clientLogLevel: 'none',
    hot: true,
    quiet: true,
    publicPath: config.output.publicPath,
    contentBase: path.resolve('public'),
    https: options.https,
    watchOptions: {
      ignored: /node_modules/,
    },

    setup: app => options.middleware && app.use(options.middleware),
  })

  devServer.listen(options.port, error => {
    if (error) {
      console.log(error) // eslint-disable-line no-console
      return
    }

    clearConsole()
    openBrowser(url)
    console.log('Starting dev server')  // eslint-disable-line no-console
  })
}

export default setup
