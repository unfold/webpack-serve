/* eslint-disable no-console */

import chalk from 'chalk'
import webpack from 'webpack'
import clearConsole from 'react-dev-utils/clearConsole'
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'

export default (config, urls, appName = process.env.npm_package_name) => {
  let compiler
  try {
    compiler = webpack(config)
  } catch (error) {
    console.log(chalk.red('Failed to compile.'))
    console.log()
    console.log(error.message || error)
    console.log()
    process.exit(1)
  }

  compiler.plugin('invalid', () => {
    if (!process.env.NO_CLEAR) {
      clearConsole()
    }
    console.log('Compiling...', '\n')
  })

  compiler.plugin('done', stats => {
    if (!process.env.NO_CLEAR) {
      clearConsole()
    }

    const messages = formatWebpackMessages(stats.toJson({}, true))

    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.\n'))
      console.log(messages.errors.join('\n\n'), '\n')
      return
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings. \n'))
      console.log(messages.warnings.join('\n\n'), '\n')
      return
    }

    console.log(chalk.green('Compiled successfully! \n'))
    console.log(`You can now view ${appName ? chalk.bold(appName) : 'the app'} in your browser`)
    console.log()
    console.log(`  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`)
    console.log(`  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`)
    console.log()
  })

  return compiler
}
