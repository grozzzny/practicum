export const checkForNull = (
  ...values: (string | null | undefined)[]
): boolean => values.some((value) => value == null)
