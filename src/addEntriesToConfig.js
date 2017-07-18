import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import mapValues from 'lodash/mapValues'

export default (config, ...entries) => {
  if (isString(config.entry)) {
    return {
      ...config,
      entry: [config.entry, ...entries],
    }
  }

  if (isArray(config.entry)) {
    return {
      ...config,
      entry: [...config.entry, ...entries],
    }
  }

  return {
    ...config,
    entry: mapValues(config.entry, entry => {
      if (isString(entry)) {
        return [entry, ...entries]
      }
      return [...entry, ...entries]
    }),
  }
}
