import template from './register.hbs?raw'
import Block from '../../core/Block'
import {
	NameValidator,
	Validator,
	emailValidator,
	emptyValidator,
	firstNameValidator,
	loginValidator,
	passwordValidator,
	phoneValidator,
	secondNameValidator
} from '../../utils/validators'
import { navigate } from '../../core/navigate'
import { Field } from '../../components'

interface RegisterPageProps {
	onRegister: (event: PointerEvent) => void
	validators: Record<NameValidator, Validator>
}

type DataRegisterForm = {
	email: string
	login: string
	first_name: string
	second_name: string
	phone: string
	password: string
}

export class RegisterPage extends Block<
	RegisterPageProps,
	{
		email: Field
		login: Field
		first_name: Field
		second_name: Field
		phone: Field
		password: Field
		password_repeat: Field
	},
	HTMLElement
> {
	constructor() {
		super({
			validators: {
				email: emailValidator,
				login: loginValidator,
				first_name: firstNameValidator,
				second_name: secondNameValidator,
				phone: phoneValidator,
				password: passwordValidator,
				password_repeat: emptyValidator
			},
			onRegister: (event: PointerEvent) => {
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

				const data: DataRegisterForm = {
					email,
					login,
					first_name,
					second_name,
					phone,
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
