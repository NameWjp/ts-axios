import { deepMerge, isPlainObject } from './util'
import { HttpHeaders, Method } from '../types'

function normalizeHeaderName(headers: Record<string, unknown>, normalizeName: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach((name) => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: HttpHeaders, data: any): HttpHeaders {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: string): HttpHeaders {
  const parsed = Object.create(null)

  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':')

    key = key.trim().toLowerCase()
    if (!key) return

    if (val) {
      val = val.trim()
    }

    parsed[key] = val
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return
  }

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
