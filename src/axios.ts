import { AxiosStatic, AxiosRequestMethodsConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import Cancel, { isCancel } from './cancel/Cancel'
import CancelToken from './cancel/CancelToken'

function createInstance(config: AxiosRequestMethodsConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = context.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken

axios.Cancel = Cancel

axios.isCancel = isCancel

export default axios
