export type Mehod = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'patch' | 'PATCH'
| 'put' | 'PUT'

export type HttpHeaders = Record<string, string>

export interface AxiosRequestConfig {
  url: string
  method?: Mehod
  data?: any
  params?: any
  headers?: HttpHeaders
}
