const toString = Object.prototype.toString

export function isDate(val: unknown): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: unknown): val is Object {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: unknown): val is Record<string, unknown> {
  return toString.call(val) === '[object Object]'
}

export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

// export function extend<T, U>(to: T, from: U): T & U {
//
//   for (const key in from) {
//     (to as T & U)[key] = from[key] as any
//   }
//
//   return to as T & U
// }

export function extend<T, U>(to: T, from: U): T & U {
  function copy(instance: Record<string, any>) {
    const source = {} as any

    Object.getOwnPropertyNames(instance).forEach((key) => {
      source[key] = instance[key]
    })

    Object.assign(to, source)

    const proto = Reflect.getPrototypeOf(instance)

    if (proto !== null) {
      copy(proto)
    }
  }

  copy(from)

  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]

        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
