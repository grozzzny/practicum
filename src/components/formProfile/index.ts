import template from './formProfile.hbs?raw'
import {
	emailValidator,
	emptyValidator,
	firstNameValidator,
	loginValidator,
	phoneValidator,
	secondNameValidator
} from '../../utils/validators'
import { Form, FormProps, FormRefs } from '../form'
import { SettingsEditElement } from '../settingsEditElement'
import { DataProfileEditForm, User } from '../../type'

interface FormProfileProps extends FormProps {
	onSave: (data: DataProfileEditForm) => void
	user: User
}

interface FormProfileRefs extends FormRefs {
	email: SettingsEditElement
	login: SettingsEditElement
	first_name: SettingsEditElement
	second_name: SettingsEditElement
	phone: SettingsEditElement
	display_name: SettingsEditElement
}

export class FormProfile extends Form<
	FormProfileProps,
	FormProfileRefs,
	HTMLElement
> {
	constructor(props: FormProfileProps) {
		super({
			...props,
			validators: {
				email: emailValidator,
				login: loginValidator,
				first_name: firstNameValidator,
				second_name: secondNameValidator,
				phone: phoneValidator,
				display_name: emptyValidator
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
		const display_name = this.refs.display_name.value()

		if (
			!email ||
			!login ||
			!first_name ||
			!second_name ||
			!phone ||
			!display_name
		) {
			return
		}

		this.props.onSave({
			email,
			login,
			first_name,
			second_name,
			phone,
			display_name
		})
	}

	protected render(): string {
		return template
	}
}
