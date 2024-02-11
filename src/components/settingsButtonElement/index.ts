import Block, { PropsType } from '../../core/Block'
import template from './settingsButtonElement.hbs?raw'
import router from '../../core/Router'

interface SettingsButtonProps {
	onClick?: () => void
	label: string
}

export class SettingsButtonElement extends Block<PropsType> {
	constructor(props: SettingsButtonProps) {
		super({
			...props
		})
	}

	protected init(): void {
		this.eventsElement = {
			click: () => {
				if (this.props.onClick) {
					this.props.onClick()
				}
				if (this.props.page) {
					router.go(this.props.page)
				}
			}
		}
	}

	protected render(): string {
		return template
	}
}
