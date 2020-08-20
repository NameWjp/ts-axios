import { AxiosRequestMethodsConfig } from '../types'
import { deepMerge, isPlanObject } from '../helpers/util'

const strats = Object.create(null)

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strat(val1: any, val2: any): any {
  return val2
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlanObject(val2)) {
    if (isPlanObject(val1)) {
      return deepMerge(val1, val2)
    } else {
      return deepMerge(val2)
    }
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else {
    if (isPlanObject(val1)) {
      return deepMerge(val1)
    } else {
      return val1
    }
  }
}

const stratKeysDeepMerage = ['headers']

stratKeysDeepMerage.forEach(key => {
  strats[key] = deepMergeStrat
})

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

/**
 * 合并配置
 * @param config1 默认配置
 * @param config2 用户传递
 */
export default function mergeConfig(config1: AxiosRequestMethodsConfig, config2?: AxiosRequestMethodsConfig): AxiosRequestMethodsConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (const key in config2) {
    mergeField(key)
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
