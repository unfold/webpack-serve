import isArray from 'lodash/isArray'
import mapValues from 'lodash/mapValues'
import client from './client'

export default config => {
  if (isArray(config.entry)) {
    return {
      ...config,
      entry: [...config.entry, client],
    }
  }

  return {
    ...config,
    entry: mapValues(config.entry, entries => [...entries, client]),
  }
}
