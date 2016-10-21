/* eslint-disable no-console */

import chalk from 'chalk'
import webpack from 'webpack'
import clearConsole from 'react-dev-utils/clearConsole'
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'

export default (config, url) => {
  const compiler = webpack(config)

  compiler.plugin('invalid', () => {
    clearConsole()
    console.log('Compiling...')
  })

  compiler.plugin('done', stats => {
    clearConsole()
    const messages = formatWebpackMessages(stats.toJson({}, true))

    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile. \n'))
      messages.errors.forEach(message => {
        console.log(message, '\n')
      })
      return
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings. \n'))
      messages.warnings.forEach(message => {
        console.log(message, '\n')
      })
      return
    }

    console.log(chalk.green('Compiled successfully! \n'))
    console.log('The app is running at:\n')
    console.log('  ', chalk.cyan.underline(url))
  })

  return compiler
}
