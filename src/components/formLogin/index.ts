import template from './formLogin.hbs?raw'
import { Field } from '../field'
import {
	loginValidator,
	passwordValidator,
} from '../../utils/validators'
import { Form, FormProps, FormRefs } from '../form'

interface FormLoginProps extends FormProps{
	onLogin: (data: DataLoginForm) => void
}

interface FormLoginRefs extends FormRefs{
	login: Field
	password: Field
}

export type DataLoginForm = {
	login: string
	password: string
}

export class FormLogin extends Form<
	FormLoginProps,
	FormLoginRefs,
	HTMLElement
> {
	constructor(props: FormLoginProps) {
		super({
			...props,
			validators: {
				login: loginValidator,
				password: passwordValidator
			}
		})
	}

	protected onSubmit(event: Event) {
			event.preventDefault()

			const login = this.refs.login.value()
			const password = this.refs.password.value()

			if (!login || !password) {
				return
			}

			this.props.onLogin({
				login,
				password
			})
	}

	protected render(): string {
		return template
	}
}
