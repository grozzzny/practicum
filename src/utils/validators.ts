export type ResultValidate = string | false
export type NameValidator = string
export type Validator = (value: string) => ResultValidate

export const loginValidator: Validator = (value: string) => {
  if (value.length === 0) {
    return 'Field can not be empty'
  }
  if (value.length < 5) {
    return `Length of login should not be less 5 letters.`
  }
  return false
}
