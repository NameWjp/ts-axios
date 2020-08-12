import { AxiosRequestConfig, HttpHeaders } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.entries(headers as HttpHeaders).forEach(([name, value]) => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete (headers as HttpHeaders)[name]
    } else {
      request.setRequestHeader(name, value)
    }
  })

  request.send(data)
}
