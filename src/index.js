/* eslint-disable no-console, prefer-template */

import path from 'path'
import chalk from 'chalk'
import defaults from 'lodash/defaults'
import detectPort from 'detect-port'
import clearConsole from 'react-dev-utils/clearConsole'
import prompt from 'react-dev-utils/prompt'
import openBrowser from 'react-dev-utils/openBrowser'
import getProcessForPort from 'react-dev-utils/getProcessForPort'
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
    publicPath: config.output.publicPath,
    contentBase: path.resolve('public'),
  })

  detectPort(options.port)
    .then(alternativePort => {
      if (alternativePort === Number(options.port)) {
        return options.port
      }

      const existingProcess = getProcessForPort(options.port)
      const question =
        chalk.yellow(
          `Something is already running on port ${options.port}.` +
            (existingProcess ? ` Probably:\n  ${existingProcess}` : '')
        ) + `\n\nUse port ${alternativePort} instead?`

      return prompt(question, true).then(useAlternative => {
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
        historyApiFallback: options.historyApiFallback || !options.server,
        https: options.https,
        setup: app => options.server && app.use(options.server),
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

        clearConsole()
        openBrowser(url)
        console.log(chalk.cyan('Starting development server...'))
      })
    })
}

export default setup
