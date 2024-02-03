import template from './profileEdit.hbs?raw'
import Block from '../../core/Block'
import {
	NameValidator,
	Validator,
	emailValidator,
	emptyValidator,
	firstNameValidator,
	loginValidator,
	phoneValidator,
	secondNameValidator
} from '../../utils/validators'
import { SettingsEditElement } from '../../components'
import { navigate } from '../../core/navigate'

interface ProfileEditPageProps {
	onSave: (event: PointerEvent) => void
	validators: Record<NameValidator, Validator>
}

type DataProfileEditForm = {
	email: string
	login: string
	first_name: string
	second_name: string
	display_name: string
	phone: string
}

export class ProfileEditPage extends Block<
	ProfileEditPageProps,
	{
		email: SettingsEditElement
		login: SettingsEditElement
		first_name: SettingsEditElement
		second_name: SettingsEditElement
		phone: SettingsEditElement
		display_name: SettingsEditElement
	}
> {
	constructor() {
		super({
			validators: {
				email: emailValidator,
				login: loginValidator,
				first_name: firstNameValidator,
				second_name: secondNameValidator,
				phone: phoneValidator,
				display_name: emptyValidator
			},
			onSave: (event: PointerEvent) => {
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

				const data: DataProfileEditForm = {
					email,
					login,
					first_name,
					second_name,
					phone,
					display_name
				}

				console.log(data)
				navigate('profile')
			}
		})
	}

	protected render(): string {
		return template
	}
}
