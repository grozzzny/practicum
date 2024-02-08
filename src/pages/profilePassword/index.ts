import template from './profilePassword.hbs?raw'
import Block from '../../core/Block'
import { SetTitle } from '../../utils/decorators'
import { DataProfilePasswordForm } from '../../type'
import { FormPassword } from '../../components'
import UserController from '../../controllers/UserController'
import { ErrorAPI } from '../../utils/HTTPTransport'

interface ProfilePasswordPageProps {
	onSave: (data: DataProfilePasswordForm) => void
}

@SetTitle('Change password')
export class ProfilePasswordPage extends Block<
	ProfilePasswordPageProps,
	{
		form: FormPassword
	},
	HTMLElement
> {
	constructor(props: ProfilePasswordPageProps) {
		super({
			...props,
			onSave: (data: DataProfilePasswordForm) => {
				UserController.changePassword(data).catch((error: ErrorAPI) => {
					this.refs.form.showError(error.reason)
				})
			}
		})
	}

	protected render(): string {
		return template
	}
}

