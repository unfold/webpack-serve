import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import mapValues from 'lodash/mapValues'

const addEntriesToConfig = async (config, ...entries) => {
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

  if (isFunction(config.entry)) {
    return addEntriesToConfig({ ...config, entry: await config.entry() }, ...entries)
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

export default addEntriesToConfig
