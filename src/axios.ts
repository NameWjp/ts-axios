import { AxiosInstance, AxiosRequestMethodsConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

function createInstance(config: AxiosRequestMethodsConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = context.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
