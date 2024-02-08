import template from './profileEdit.hbs?raw'
import Block from '../../core/Block'
import { SetTitle } from '../../utils/decorators'
import { connect } from '../../utils/connect'
import { DataProfileEditForm, User } from '../../type'
import { ErrorAPI } from '../../utils/HTTPTransport'
import UserController from '../../controllers/UserController'
import { FormProfile } from '../../components'

interface ProfileEditPageProps {
	onSave: (data: DataProfileEditForm) => void
	user: User
}

@SetTitle('Change data')
export class ProfileEditPage extends Block<
	ProfileEditPageProps,
	{
		form: FormProfile
	},
	HTMLElement
> {
	constructor(props: ProfileEditPageProps) {
		super({
			...props,
			onSave: (data: DataProfileEditForm) => {
				UserController.changeProfile(data).catch((error: ErrorAPI) => {
					this.refs.form.showError(error.reason)
				})
			}
		})
	}

	protected render(): string {
		return template
	}
}

export const ProfileEditPageConnect = connect(ProfileEditPage, (state => ({user: state.user})))
