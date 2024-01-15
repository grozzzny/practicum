export type ResultValidate = string | false
export type NameValidator = string
export type Validator = (value: string) => ResultValidate

export const loginValidator: Validator = (value) => {
  if (value.length === 0) {
    return 'Field can not be empty'
  }
  if (value.length < 3 || value.length > 20) {
    return 'Length of login should be between 3 and 20 characters'
  }
  const regex = /^[A-Za-z]+[A-Za-z0-9_-]*$/
  if (!regex.test(value)) {
    return 'Invalid format for login'
  }
  return false
}

export const firstNameValidator: Validator = (value) => {
  const regex = /^[A-Za-zА-Яа-я][A-Za-zА-Яа-я-]*$/
  if (value.length === 0) {
    return 'Field can not be empty'
  }
  if (!regex.test(value)) {
    return 'Invalid format for first name'
  }
  return false
}

export const secondNameValidator: Validator = (value) => {
  const regex = /^[A-Za-zА-Яа-я][A-Za-zА-Яа-я-]*$/
  if (value.length === 0) {
    return 'Field can not be empty'
  }
  if (!regex.test(value)) {
    return 'Invalid format for second name'
  }
  return false
}

export const emailValidator: Validator = (value) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (value.length === 0) {
    return 'Field can not be empty'
  }
  if (!regex.test(value)) {
    return 'Invalid email format'
  }
  return false
}

export const passwordValidator: Validator = (value) => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/
  if (value.length === 0) {
    return 'Field can not be empty'
  }
  if (!regex.test(value)) {
    return 'Invalid password format'
  }
  return false
}

export const emptyValidator: Validator = (value) => {
  if (value.length === 0) {
    return 'Field can not be empty'
  }
  return false
}

export const phoneValidator: Validator = (value) => {
  const regex = /^\+?\d{10,15}$/
  if (value.length === 0) {
    return 'Field can not be empty'
  }
  if (!regex.test(value)) {
    return 'Invalid phone number format'
  }
  return false
}

export const messageValidator: Validator = (value) => {
  if (value.length === 0) {
    return 'Field can not be empty'
  }
  return false
}
