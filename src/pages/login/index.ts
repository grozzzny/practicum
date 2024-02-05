import Block from '../../core/Block'
import template from './login.hbs?raw'
import { Field } from '../../components'
import { navigate } from '../../core/navigate'
import {
	NameValidator,
	Validator,
	loginValidator,
	passwordValidator
} from '../../utils/validators'
import { SetTitle } from '../../utils/decorators'

interface LoginPageProps {
	onLogin: (event: PointerEvent) => void
	validators: Record<NameValidator, Validator>
}

type DataLoginForm = {
	login: string
	password: string
}

@SetTitle('Login')
export class LoginPage extends Block<
	LoginPageProps,
	{
		login: Field
		password: Field
	},
	HTMLElement
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
		}, 'flex')
	}

	protected render(): string {
		return template
	}
}
