import Block from '../../core/Block'
import template from './chat.hbs?raw'
import './chat.css'
import { ChatType, DataFormSend, User } from '../../type'
import { FormSend } from '../formSend'
import { sendMessage } from '../../services/chatService'
import { connect } from '../../utils/connect'

interface ChatProps {
	activeChat: ChatType | null
	onSend: (data: DataFormSend) => void
	onAdd: (event: Event) => void
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
			onAdd: (event) => {
				event.preventDefault()
				alert('not work')
			},
			onSend: ({ message }: DataFormSend) => {
				sendMessage(message)
					.then(() => {
						this.refs.form.clear()
						this.refs.form.focus()
					})
					.catch((error) => {
						this.refs.form.showError(error)
					})
			}
		})
	}

	protected render(): string {
		return template
	}
}

export const ChatConnect = connect(Chat, (state) => ({
	user: state.user,
	activeChat: state.activeChat
}))
