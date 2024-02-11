import template from './profile.hbs?raw'
import Block from '../../core/Block'
import { SetTitle } from '../../utils/decorators'
import AuthController from '../../controllers/AuthController'
import { connect } from '../../utils/connect'
import { User } from '../../type'
import { ModalAvatar } from '../../components'

interface ProfilePageProps {
	onExit: () => void
	user: User
	onModal: (event: Event, modalName: string | undefined) => void
}

@SetTitle('Settings')
export class ProfilePage extends Block<
	ProfilePageProps,
	{
		modalAvatar: ModalAvatar
	},
	HTMLElement
> {
	constructor(props: ProfilePageProps) {
		super({
			...props,
			onExit: () => {
				AuthController.logout().catch((error) => console.error(error))
			},
			onModal: (event, modalName) => {
				event.preventDefault()
				Object.entries(this.refs).forEach(([_name, block]) => {
					if ('modalName' in block) {
						block.setProps({
							modalVisible: block.modalName === modalName
						})
					}
				})
			}
		})
	}

	protected render(): string {
		return template
	}
}

export const ProfilePageConnect = connect(ProfilePage, (state) => ({
	user: state.user
}))
