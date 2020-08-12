import { isPlanObject } from './util'

export function transformRequest(data: any): any {
  if (isPlanObject(data)) {
    return JSON.stringify(data)
  }
  return data;
}
