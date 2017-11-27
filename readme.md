# Webpack Serve
Takes your webpack config and creates a development server with hot module reloading and error overlay. Built to resemble the experience you get from [create-react-app](https://github.com/facebookincubator/create-react-app).

## Install
`npm install --save-dev @unfold/webpack-serve`

## Usage
### In the terminal
Either run `$(npm bin)/webpack-serve` at the root of your project, or add a `"serve": "webpack-serve",` to your package.json scripts. All arguments given are passed over to the [webpack CLI](https://webpack.js.org/api/cli/).

### With own express/connect backend
You can import and configure it with your own middleware or server.

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

## Quick example
```bash
mkdir my-app && cd my-app
echo "alert('🤓')" > index.js
mkdir public && echo "<script src=build.js></script>" > public/index.html
npm install @unfold/webpack-serve
$(npm bin)/webpack-serve index.js build.js
```

Copy the above code and run it in your terminal and you'll have a new app up and running. When you want to add webpack loaders or similar, use the [webpack CLI](https://webpack.js.org/api/cli/) options or add a `webpack.config.js` file.

## Example screenshots from console and error overlay
![screenshot showing compiled successfully](https://user-images.githubusercontent.com/1495211/28369639-8090b76c-6c98-11e7-9cd9-c9be0e983884.png)
![screenshot showing warnings](https://user-images.githubusercontent.com/1495211/28369637-8087885e-6c98-11e7-9b23-dcdd50aa75ab.png)
![screenshot showing error](https://user-images.githubusercontent.com/1495211/28369638-80888592-6c98-11e7-9c58-d6bbaf6b0fbe.png)
![screenshot showing error overlay](https://user-images.githubusercontent.com/1495211/28369770-d3359f0a-6c98-11e7-86c8-880270c8eca1.png)

## Credits
This project is using multiple utilities from `react-dev-utils` and the console look is shamelessly copied from the [create-react-app](https://github.com/facebookincubator/create-react-app) console.
