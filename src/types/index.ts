export type Mehod = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'patch' | 'PATCH'
| 'put' | 'PUT'

export interface AxiosRequestConfig {
  url: string
  method?: Mehod
  data?: any
  params?: any
}
