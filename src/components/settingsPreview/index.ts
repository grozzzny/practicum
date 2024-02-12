import Block, { RefType } from '../../core/Block'
import template from './settingsPreview.hbs?raw'
import './settingsPreview.css'
import { getUrlAvatar } from '../../services/userService'

export interface SettingsPreviewProps {
	onClick: (event: Event, modal: string) => void
	image?: string
	name: string
	modal: string
}

export class SettingsPreview extends Block<
	SettingsPreviewProps,
	RefType,
	HTMLElement
> {
	constructor(props: SettingsPreviewProps) {
		super({
			...props,
			image: props.image ? getUrlAvatar(props.image) : undefined
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
