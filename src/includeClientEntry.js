import isArray from 'lodash/isArray'
import mapValues from 'lodash/mapValues'

const client = 'react-dev-utils/webpackHotDevClient'

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
