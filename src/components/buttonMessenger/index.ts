import Block, { PropsType } from '../../core/Block'
import template from './buttonMessenger.hbs?raw'
import router from '../../core/Router'

export class ButtonMessenger extends Block<PropsType> {
	protected init(): void {
		this.eventsElement = {
			click: () => {
				router.go('/messenger')
			}
		}
	}

	protected render(): string {
		return template
	}
}
