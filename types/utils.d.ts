/**
 * An utility type, that merges two types. It guarantees, that if some
 * of the properties names between two types math, the resulting type
 * will infer those properties from the first type.
 * It is helpful when wewant to override some properties on one type
 * with some custom implementation. Think of it as a type analog of
 * Object.assign() or { ...originalObject, overrittenPropert: newValue }
 * (in es6)
 *
 * Usage:
 *
 * type OriginalType = {
 *    overritenProperty: string
 *    regularProperty: string
 * }
 *
 * type TypeWithOverrides = MergeWithPriority<
 *    { overritenProperty: boolean },
 *    OriginalType
 * >
 *
 * The resulting type will be:
 * {
 *    overritenProperty: boolean
 *    regularProperty: string
 * }
 */
type MergeWithPriority<T, P> = T & Omit<P, keyof T>

/**
 * Utility type, that helps partial types for nested objects
 */
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
