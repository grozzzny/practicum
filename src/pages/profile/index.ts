import template from './profile.hbs?raw'
import Block, { RefType } from '../../core/Block'
import { SetTitle } from '../../utils/decorators'
import AuthController from '../../controllers/AuthController'

interface ProfilePageProps {
	onExit: () => void
}

@SetTitle('Settings')
export class ProfilePage extends Block<ProfilePageProps, RefType, HTMLElement> {
	constructor() {
		super(
			{
				onExit: () =>
					AuthController.logout().catch(error => console.error(error))
			},
			'flex'
		)
	}

	protected render(): string {
		return template
	}
}
