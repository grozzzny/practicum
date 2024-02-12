import template from './formPassword.hbs?raw'
import { emptyValidator, passwordValidator } from '../../utils/validators'
import { Form, FormProps, FormRefs } from '../form'
import { SettingsEditElement } from '../settingsEditElement'
import { DataProfilePasswordForm } from '../../type'

interface FormPasswordProps extends FormProps {
	onSave: (data: DataProfilePasswordForm) => void
}

interface FormPasswordRefs extends FormRefs {
	old_password: SettingsEditElement
	new_password: SettingsEditElement
	new_password_repeat: SettingsEditElement
}

export class FormPassword extends Form<
	FormPasswordProps,
	FormPasswordRefs,
	HTMLElement
> {
	constructor(props: FormPasswordProps) {
		super({
			...props,
			validators: {
				password: passwordValidator,
				empty: emptyValidator
			}
		})
	}

	protected onSubmit(event: Event) {
		event.preventDefault()
		const old_password = this.refs.old_password.value()
		const new_password = this.refs.new_password.value()
		const new_password_repeat = this.refs.new_password_repeat.value()

		if (!old_password || !new_password || !new_password_repeat) {
			return
		}

		if (new_password !== new_password_repeat) {
			this.refs.new_password_repeat.setError('Passwords do not match')

			return
		}

		this.refs.new_password_repeat.removeError()

		this.props.onSave({
			oldPassword: old_password,
			newPassword: new_password
		})
	}

	protected render(): string {
		return template
	}
}
