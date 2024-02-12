import Block from '../../core/Block'
import template from './button.hbs?raw'
import './button.css'
import router from '../../core/Router'

interface ButtonProps {
	label: string
	type: 'primary' | 'link'
	buttonType?: 'submit' | 'button' | 'reset'
	page: string
	onClick?: () => void
}

export class Button extends Block<ButtonProps> {
	constructor(props: ButtonProps) {
		super({
			buttonType: 'button',
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
