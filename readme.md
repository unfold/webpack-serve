# Webpack Serve

This is a fork of the development server bundled with [create-react-app](https://github.com/facebookincubator/create-react-app). 

## Install
#### npm
`npm install --save-dev @unfold/webpack-serve`
#### yarn
`yarn add --dev @unfold/webpack-serve`

## Usage
`scripts/serve.js`
```js
import webpackServe from '@unfold/webpack-serve'
import config from '../webpack.config'

webpackServe(config)
```

### With own express/connect backend
```js
import webpackServe from '@unfold/webpack-serve'
import config from '../webpack.config'
import server from '../src/server.js'

webpackServe(config, { 
  middleware: server
})
```
