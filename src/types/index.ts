import InterceptorManager from '../core/InterceptorManager'

export type Method = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'patch' | 'PATCH'
| 'put' | 'PUT'

export type HttpHeaders = Record<string, any>

export interface AxiosRequestMethodsConfig {
  method?: Method
  data?: any
  params?: any
  headers?: HttpHeaders
  responseType?: XMLHttpRequestResponseType
  timeout?: number

  [propName: string]: any
}

export interface AxiosRequestConfig extends AxiosRequestMethodsConfig{
  url: string
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRequestMethodsConfig
  interceptors: {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestMethodsConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestMethodsConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestMethodsConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios{
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestMethodsConfig): AxiosPromise<T>
}

export interface AxiosInterceptorManage<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
