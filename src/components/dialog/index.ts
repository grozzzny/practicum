import Block from '../../core/Block'
import template from './dialog.hbs?raw'
import './dialog.css'
import { ChatType } from '../../type'
import { getUrlAvatar } from '../../services/userService'
import store from '../../core/Store'

interface DialogProps {
	activeChat?: ChatType
	chat: ChatType
	active: boolean
	time: string | undefined
	avatar: string | undefined
}

export class Dialog extends Block<
	DialogProps,
	Record<string, never>,
	HTMLElement
> {
	constructor(props: DialogProps) {
		super({
			...props,
			active: props.activeChat?.id === props.chat.id,
			time: props.chat.last_message?.time,
			avatar: props.chat.avatar ? getUrlAvatar(props.chat.avatar) : undefined
		})
	}

	protected init() {
		this.eventsElement = {
			click: () => {
				if(!this.props.active) {
					store.set('activeChat', this.props.chat)
				}
			}
		}
	}

	protected render(): string {
		return template
	}
}
