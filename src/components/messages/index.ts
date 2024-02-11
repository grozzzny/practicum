import Block, { RefType } from '../../core/Block'
import template from './messages.hbs?raw'
import './messages.css'
import { MessageType, User } from '../../type'
import { connect } from '../../utils/connect'

export interface MessagesProps {
	chatUsers: User[]
	user: User
	isFewUsers: boolean
	messages: MessageType[]
}

export class Messages extends Block<MessagesProps, RefType, HTMLElement> {
	constructor(props: MessagesProps) {
		super({
			...props,
			isFewUsers: props.chatUsers.length < 2
		})
	}

	protected render(): string {
		return template
	}
}

export const MessagesConnect = connect(Messages, (state) => ({
	user: state.user,
	chatUsers: state.chatUsers,
	messages: state.messages
}))
