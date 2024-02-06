import Block, { PropsType } from '../../core/Block'
import template from './buttonProfile.hbs?raw'
import router from '../../core/Router'

export class ButtonProfile extends Block<PropsType> {
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
