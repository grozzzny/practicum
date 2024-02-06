import template from './formRegistration.hbs?raw'
import { Field } from '../field'
import {
	emailValidator,
	emptyValidator,
	firstNameValidator,
	loginValidator,
	passwordValidator,
	phoneValidator,
	secondNameValidator,
} from '../../utils/validators'
import { Form, FormProps, FormRefs } from '../form'
import { DataRegistrationForm } from '../../type'

interface FormRegistrationProps extends FormProps{
	onRegister: (data: DataRegistrationForm) => void
}

interface FormRegistrationRefs extends FormRefs{
	email: Field
	login: Field
	first_name: Field
	second_name: Field
	phone: Field
	password: Field
	password_repeat: Field
}

export class FormRegistration extends Form<
	FormRegistrationProps,
	FormRegistrationRefs,
	HTMLElement
> {
	constructor(props: FormRegistrationProps) {
		super({
			...props,
			validators: {
				email: emailValidator,
				login: loginValidator,
				first_name: firstNameValidator,
				second_name: secondNameValidator,
				phone: phoneValidator,
				password: passwordValidator,
				password_repeat: emptyValidator
			}
		})
	}

	protected onSubmit(event: Event) {
		event.preventDefault()
		const email = this.refs.email.value()
		const login = this.refs.login.value()
		const first_name = this.refs.first_name.value()
		const second_name = this.refs.second_name.value()
		const phone = this.refs.phone.value()
		const password = this.refs.password.value()
		const password_repeat = this.refs.password_repeat.value()

		if (
			!email ||
			!login ||
			!first_name ||
			!second_name ||
			!phone ||
			!password ||
			!password_repeat
		) {
			return
		}

		if (password !== password_repeat) {
			this.refs.password_repeat.setError('Passwords do not match')

			return
		}

		this.refs.password_repeat.removeError()

		this.props.onRegister({
			email,
			login,
			first_name,
			second_name,
			phone,
			password
		})
	}

	protected render(): string {
		return template
	}
}
