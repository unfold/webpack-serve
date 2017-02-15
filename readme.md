# Webpack Serve

This is a fork of the development server bundled with [create-react-app](https://github.com/facebookincubator/create-react-app). 

## Install
#### npm
`npm install --save-dev @unfold/webpack-serve`
#### yarn
`yarn add --dev @unfold/webpack-serve`

## Usage
### In the terminal
run `webpack-serve` in your terminal in the root of your project.
All arguments given are passed over to webpack CLI.

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
