import Block from '../../core/Block'
import template from './formLogin.hbs?raw'
import { Field } from '../field'
import {
	loginValidator,
	passwordValidator,
	Validators
} from '../../utils/validators'
import { ErrorLine } from '../errorLine'

interface FormLoginProps {
	onLogin: (data: DataLoginForm) => void
	validators: Validators
}

export type DataLoginForm = {
	login: string
	password: string
}

export class FormLogin extends Block<
	FormLoginProps,
	{
		login: Field
		password: Field
		errorLine: ErrorLine
	},
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

	public showError(error: string) {
		this.refs.errorLine.setProps({
			error
		})
		setTimeout(() => {
			this.refs.errorLine.setProps({
				error: undefined
			})
		}, 3000)
	}

	protected init(): void {
		this.eventsElement = {
			submit: this.onSubmit.bind(this)
		}
	}

	protected render(): string {
		return template
	}
}
