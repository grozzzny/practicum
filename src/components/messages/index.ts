import Block, { RefType } from '../../core/Block'
import template from './messages.hbs?raw'
import './messages.css'
import { ChatType, MessageType, User } from '../../type'

export interface MessagesProps {
	activeChat: ChatType | null
	chatUsers: User[]
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

	public visible() {
		this.element.parentElement!.scrollTop =
			this.element.parentElement!.scrollHeight
		this.element.classList.remove('messages--hidden')
	}

	public hidden() {
		this.element.classList.add('messages--hidden')
	}

	async componentDidMount() {
		this.visible()
	}
}
