import {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosRequestMethodsConfig,
  Method,
  AxiosResponse, ResolvedFn, RejectedFn
} from '../types'
import dispatchRequest, { transformURL } from './dispatchRequest'
import { Axios as AxiosInterface } from '../types'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios implements AxiosInterface {
  defaults: AxiosRequestMethodsConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestMethodsConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: string | AxiosRequestConfig, config?: AxiosRequestMethodsConfig): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      Object.assign(config, {
        url,
      })
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise: Promise<any> = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestMethodsConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestMethodsConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestMethodsConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  getUri(config?: AxiosRequestConfig): string {
    config = mergeConfig(this.defaults, config) as AxiosRequestConfig
    return transformURL(config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestMethodsConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestMethodsConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }))
  }
}
