import Block from '../../core/Block'
import template from './menuElement.hbs?raw'
import './menuElement.css'

interface MenuElementProps {
	icon: string
	label: string
	modal: string | undefined
	onClick: (event: Event, modal: string | undefined) => void
}

export class MenuElement extends Block<
	MenuElementProps,
	Record<string, never>,
	HTMLElement
> {
	constructor(props: MenuElementProps) {
		super({
			...props
		})
	}

	protected init(): void {
		this.eventsElement = {
			click: (event) => this.props.onClick(event, this.props.modal)
		}
	}

	protected render(): string {
		return template
	}
}
