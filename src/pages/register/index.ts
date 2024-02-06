import template from './register.hbs?raw'
import Block from '../../core/Block'
import { FormRegistration } from '../../components'
import { SetTitle } from '../../utils/decorators'
import { DataRegistrationForm } from '../../components/formRegistration'
import AuthController from '../../controllers/AuthController'
import { ErrorAPI } from '../../utils/HTTPTransport'

interface RegisterPageProps {
	onRegister: (data: DataRegistrationForm) => void
}

@SetTitle('Registration')
export class RegisterPage extends Block<
	RegisterPageProps,
	{
		form: FormRegistration
	},
	HTMLElement
> {
	constructor() {
		super({
			onRegister: (data: DataRegistrationForm) => {
				AuthController.signup(data).catch((error: ErrorAPI) => {
					this.refs.form.showError(error.reason)
				})
			}
		}, 'flex')
	}

	protected render(): string {
		return template
	}
}
