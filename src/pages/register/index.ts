import template from './register.hbs?raw'
import Block from '../../core/Block'
import { FormRegistration } from '../../components'
import { SetTitle } from '../../utils/decorators'
import AuthController from '../../controllers/AuthController'
import { ErrorAPI } from '../../utils/HTTPTransport'
import { DataRegistrationForm } from '../../type'

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
		})
	}

	protected render(): string {
		return template
	}
}
