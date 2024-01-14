import Block from '../../core/Block'
import template from './login.hbs?raw'
import { Field } from '../../components'
import { navigate } from '../../core/navigate'
import { loginValidator, NameValidator, Validator } from '../../utils/validators'

interface LoginPageProps {
  onLogin: (event: PointerEvent) => void
  validators: Record<NameValidator, Validator>
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
        login: loginValidator
      },
      onLogin: (event: PointerEvent) => {
        event.preventDefault()
        const login = this.refs.login.value()
        const password = this.refs.password.value()

        if (!login) {
          return
        }

        console.log({
          login,
          password
        })
        navigate('chats')
      }
    })
  }

  protected render(): string {
    return template
  }
}
