export const checkForNull = (...values: (string | null | undefined)[]): boolean => {
  return values.some((value) => value == null)
}
