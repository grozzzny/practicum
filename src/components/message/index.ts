import './message.css'
import Block, { RefType } from '../../core/Block'
import template from './message.hbs?raw'
import { MessageType, User } from '../../type'
import { formatDateTime } from '../../utils/helper'

export interface MessageProps {
	user: User
	message: MessageType
	self: boolean
	read: boolean
	time: string
}

export class Message extends Block<MessageProps, RefType, HTMLElement> {
	constructor(props: MessageProps) {
		super({
			...props,
			time: props.message ? formatDateTime(props.message.time) : '',
			self: props.message.user_id === props.user.id
		})
	}

	protected render(): string {
		return template
	}

	componentDidMount() {
		const parent = this.element.parentElement!.parentElement!.parentElement
		if (parent) {
			parent.scrollTop = parent.scrollHeight
		}
	}
}
