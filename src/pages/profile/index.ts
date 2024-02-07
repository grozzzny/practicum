import template from './profile.hbs?raw'
import Block, { RefType } from '../../core/Block'
import { SetTitle } from '../../utils/decorators'
import AuthController from '../../controllers/AuthController'
import { connect } from '../../utils/connect'
import { User } from '../../type'

interface ProfilePageProps {
	onExit: () => void
	user: User
}

@SetTitle('Settings')
export class ProfilePage extends Block<ProfilePageProps, RefType, HTMLElement> {
	constructor(props: ProfilePageProps) {
		super(
			{
				...props,
				onExit: () =>
					AuthController.logout().catch((error) => console.error(error))
			},
			'flex'
		)
	}

	protected render(): string {
		return template
	}
}

export const ProfilePageConnect = connect(ProfilePage, (state) => ({
	user: state.user
}))
