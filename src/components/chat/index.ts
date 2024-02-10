import Block from '../../core/Block'
import template from './chat.hbs?raw'
import './chat.css'
import { ChatType, DataFormSend, User } from '../../type'
import { FormSend } from '../formSend'
import { sendMessage } from '../../services/chatService'

interface ChatProps {
	activeChat: ChatType | null
	chatUsers: User[]
	onSend: (data: DataFormSend) => void
	onModal: (event: Event, modal: string | undefined) => void
	user: User
}

export class Chat extends Block<
	ChatProps,
	{
		form: FormSend
	},
	HTMLElement
> {
	constructor(props: ChatProps) {
		super({
			...props,
			onSend: ({message}: DataFormSend) => {
				sendMessage(message).then(() => {
					this.refs.form.clear()
				}).catch((error) => {
					this.refs.form.showError(error)
				})
			}
		})
	}

	protected render(): string {
		return template
	}
}
