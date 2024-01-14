import Block from '../../core/Block'
import template from './login.hbs?raw'
import { Field } from '../../components'
import { navigate } from '../../core/navigate'
import {
  loginValidator,
  NameValidator, passwordValidator,
  Validator,
} from '../../utils/validators'

interface LoginPageProps {
  onLogin: (event: PointerEvent) => void
  validators: Record<NameValidator, Validator>
}

type DataLoginForm = {
  login: string
  password: string
}

export class LoginPage extends Block<
  LoginPageProps,
  {
    login: Field
    password: Field
  }
> {
  constructor() {
    super({
      validators: {
        login: loginValidator,
        password: passwordValidator
      },
      onLogin: (event: PointerEvent) => {
        event.preventDefault()
        const login = this.refs.login.value()
        const password = this.refs.password.value()

        if (!login || !password) {
          return
        }

        const data: DataLoginForm = {
          login,
          password
        }

        console.log(data)
        navigate('chats')
      }
    })
  }

  protected render(): string {
    return template
  }
}
