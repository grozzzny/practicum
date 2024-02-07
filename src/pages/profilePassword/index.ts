import template from './profilePassword.hbs?raw'
import Block from '../../core/Block'
import {
	NameValidator,
	Validator,
	emptyValidator,
	passwordValidator
} from '../../utils/validators'
import { SettingsEditElement } from '../../components'
import { SetTitle } from '../../utils/decorators'

interface ProfilePasswordPageProps {
	onSave: (event: PointerEvent) => void
	validators: Record<NameValidator, Validator>
}

type DataProfilePasswordForm = {
	password: string
}

@SetTitle('Change password')
export class ProfilePasswordPage extends Block<
	ProfilePasswordPageProps,
	{
		old_password: SettingsEditElement
		new_password: SettingsEditElement
		new_password_repeat: SettingsEditElement
	},
	HTMLElement
> {
	constructor() {
		super({
			validators: {
				password: passwordValidator,
				empty: emptyValidator
			},
			onSave: (event: PointerEvent) => {
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

				const data: DataProfilePasswordForm = {
					password: new_password
				}

				console.log(data)
			}
		}, 'flex')
	}

	protected render(): string {
		return template
	}
}
