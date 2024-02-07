import Block from '../../core/Block'
import template from './buttonProfile.hbs?raw'
import router from '../../core/Router'

type ButtonProfileProps = {
	image: string
}

export class ButtonProfile extends Block<ButtonProfileProps> {
	protected init(): void {
		this.eventsElement = {
			click: () => {
				router.go('/settings')
			}
		}
	}

	protected render(): string {
		return template
	}
}
