# Webpack Serve
Takes your wepback config and creates a development server with hot module reloading and error overlay. Built to resemble the experience you get from [create-react-app](https://github.com/facebookincubator/create-react-app).

## Install
`npm install --save-dev @unfold/webpack-serve`

Webpack serve currently only work with webpack 2.

## Usage
### In the terminal
Either run `$(npm bin)/webpack-serve` at the root of your project, or add a `"serve": "webpack-serve",` to your package.json scripts. All arguments given are passed over to the [webpack CLI](https://webpack.js.org/api/cli/).

### With own express/connect backend
You can import it and use and configure it with your own middleware or server.

```js
import webpackServe from '@unfold/webpack-serve'
import config from '../webpack.config'
import server from './server'

webpackServe(config, {
  server,
  port: 5050,
})
```

### Options
| name          | description                                                               | default value   |
|-------------  |-------------------------------------------------------------------------- |---------------  |
| port          | Port used for server                                                      | 8080            |
| hostname      | Used by webpack and when opening the application in the browser on start  | localhost       |
| contentBase   | Which folder to serve static content from                                 | /public         |
| https         | Serves content with SSL                                                   | false           |

Pass them to `webpackServe(config, { ...options })` or use `PORT=5000 HTTPS=true webpack-serve` in the terminal.

## Credits
This project is using multiple utilities from `react-dev-utils` and the console look is shamelessly copied from the [create-react-app](https://github.com/facebookincubator/create-react-app) console.
