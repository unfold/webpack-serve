/* eslint-disable no-console */

import path from 'path'
import chalk from 'chalk'
import defaults from 'lodash/defaults'
import detectPort from 'detect-port'
import clearConsole from 'react-dev-utils/clearConsole'
import prompt from 'react-dev-utils/prompt'
import openBrowser from 'react-dev-utils/openBrowser'
import WebpackDevServer from 'webpack-dev-server'
import createCompiler from './createCompiler'
import includeClientEntry from './includeClientEntry'

const setup = (config, params) => {
  if (!config) {
    console.log(chalk.red('webpack config is missing.'))
    return
  }

  const options = defaults(params, {
    port: process.env.PORT || 8080,
    hostname: process.env.HOSTNAME || 'localhost',
    https: false,
    publicPath: config.output.publicPath,
    contentBase: path.resolve('public'),
  })

  detectPort(options.port).then(alternativePort => {
    if (alternativePort === Number(options.port)) {
      return options.port
    }

    return prompt(chalk.yellow(
      `Something is already running on port ${options.port}. \n` +
      `Use port ${alternativePort} instead?`
    ), true).then(useAlternative => {
      if (useAlternative) {
        return alternativePort
      }

      process.exit()
      return false
    })
  })
  .then(port => {
    const url = `${options.https ? 'https' : 'http'}://${options.hostname}:${port}`
    const compiler = createCompiler(includeClientEntry(config), url)
    const devServer = new WebpackDevServer(compiler, {
      clientLogLevel: 'none',
      hot: true,
      quiet: true,
      publicPath: options.publicPath,
      contentBase: options.contentBase,
      historyApiFallback: true,
      https: options.https,
      watchOptions: {
        ignored: /node_modules/,
      },
    })

    if (options.middleware) {
      devServer.use(options.middleware)
    }

    devServer.listen(port, error => {
      if (error) {
        console.log(error)
        return
      }

      clearConsole()
      openBrowser(url)
      console.log(chalk.cyan('Starting development server...'))
    })
  })
}

export default setup
