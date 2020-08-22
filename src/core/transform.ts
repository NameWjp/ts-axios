import { AxiosTransformer } from '../types'

/**
 * 每个处理函数返回 data，headers 始终保持引用修改
 * @param data
 * @param headers
 * @param fns 处理函数
 */
export default function transform(data: any, headers: any, fns?: AxiosTransformer | AxiosTransformer[]): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
