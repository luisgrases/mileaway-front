const processItem = (
  item: any,
  key: string,
  options: { transformItem?: (item: any) => any }
): { [key: string]: any } => {
  if (Array.isArray(item)) {
    return item.reduce((accum, arrayItem, index) => {
      const newKey = `${key}.${index}`
      return { ...accum, ...processItem(arrayItem, newKey, options) }
    }, {})
  }
  if (
    typeof item === 'object' &&
    item != null &&
    typeof item.then !== 'function' // exclude promise
  ) {
    return flattenObject(item, { ...options, basePath: key })
  }

  return { [key]: options?.transformItem ? options.transformItem(item) : item }
}

export const flattenObject = (
  obj: { [key: string]: any },
  options?: {
    basePath?: string
    transformItem?: (item: string | number | boolean) => any
  }
): { [key: string]: any } => {
  return Object.keys(obj).reduce((accum: { [key: string]: any }, key: string): {
    [key: string]: any
  } => {
    const newKey = [options?.basePath, key].filter(Boolean).join('.')
    const item = obj[key]

    return {
      ...accum,
      ...processItem(item, newKey, options)
    }
  }, {})
}

export const scrollFieldIntoViewIfNeeded = (
  inputElement: HTMLElement
): void => {
  const { top, bottom } = inputElement.getBoundingClientRect()
  const safeZoneTop = 0.1 * window.innerHeight
  const safeZoneBottom = 0.8 * window.innerHeight

  if (top < safeZoneTop) {
    window.scrollTo(window.scrollX, window.scrollY - safeZoneTop + top)
  } else if (bottom > safeZoneBottom) {
    window.scrollTo(window.scrollX, window.scrollY - safeZoneBottom + bottom)
  }
}

export const focusFormField = (fieldName: string): void => {
  const fieldEl: HTMLElement = document.querySelector(
    `[data-field-name="${fieldName}"]`
  )
  if (fieldEl) {
    fieldEl.focus()

    scrollFieldIntoViewIfNeeded(fieldEl)
  }
}

export const isEqual = (v1: any, v2: any): boolean => {
  if (v1 === v2) return true
  // A special use cases that is related to how the inputs work in web.
  // Because text inputs contain their values as strings, number values,
  // that come from the server, can be stored as number (1) in the form initial
  // values, but will will be stored as a string ('1') in the input.
  // And when we are trying to determine if value was changed or not, we should
  // handle this use case.
  if (v1 && (typeof v1 === 'number' || typeof v1 === 'string')) return v1 == v2
  if (v1 === 0 || v1 === '0') return v2 === 0 || v2 === '0'
  if (!v1 || typeof v2 !== 'object') return v1 === v2
  if (!v2 || typeof v2 !== 'object') return false
  if (Array.isArray(v1) !== Array.isArray(v2)) return false

  const keys1 = Object.keys(v1)
  if (keys1.length !== Object.keys(v2).length) return false
  for (const key of keys1) {
    if (!isEqual(v1[key], v2[key])) return false
  }
  return true
}
