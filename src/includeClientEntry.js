import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import mapValues from 'lodash/mapValues'

const client = 'react-dev-utils/webpackHotDevClient'

export default config => {
  if (isString(config.entry)) {
    return {
      ...config,
      entry: [config.entry, client],
    }
  }

  if (isArray(config.entry)) {
    return {
      ...config,
      entry: [...config.entry, client],
    }
  }

  return {
    ...config,
    entry: mapValues(config.entry, entry => {
      if (isString(entry)) {
        return [entry, client]
      }
      return [...entry, client]
    }),
  }
}
