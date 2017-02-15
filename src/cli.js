#!/usr/bin/env node

import yargs from 'yargs'
import convertArgv from 'webpack/bin/convert-argv'
import setup from './index'

setup(convertArgv(yargs, yargs.argv))
