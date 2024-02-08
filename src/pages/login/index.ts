import Block from '../../core/Block'
import template from './login.hbs?raw'
import { SetTitle } from '../../utils/decorators'
import { FormLogin } from '../../components'
import AuthController from '../../controllers/AuthController'
import { ErrorAPI } from '../../utils/HTTPTransport'
import { DataLoginForm } from '../../type'

interface LoginPageProps {
	onLogin: (data: DataLoginForm) => void
}

@SetTitle('Login')
export class LoginPage extends Block<
	LoginPageProps,
	{
		form: FormLogin
	},
	HTMLElement
> {
	constructor() {
		super(
			{
				onLogin: (data: DataLoginForm) => {
					AuthController.signin(data).catch((error: ErrorAPI) => {
						this.refs.form.showError(error.reason)
					})
				}
			}
		)
	}

	protected render(): string {
		return template
	}
}
