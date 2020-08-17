export type Method = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'patch' | 'PATCH'
| 'put' | 'PUT'

export type HttpHeaders = Record<string, string>

export interface AxiosRequestMethodsConfig {
  method?: Method
  data?: any
  params?: any
  headers?: HttpHeaders
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosRequestConfig extends AxiosRequestMethodsConfig{
  url: string
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export type AxiosPromise = Promise<AxiosResponse>

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise

  head(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise

  options(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestMethodsConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestMethodsConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestMethodsConfig): AxiosPromise
}

export interface AxiosInstance extends Axios{
  (config: AxiosRequestConfig): AxiosPromise
  (url: string, config: AxiosRequestMethodsConfig): AxiosPromise
}
