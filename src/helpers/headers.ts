import { isPlanObject } from './util'
import { HttpHeaders } from '../types'

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

  if (isPlanObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
