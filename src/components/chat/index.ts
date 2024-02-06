import Block from '../../core/Block'
import template from './chat.hbs?raw'
import './chat.css'
import { ChatType } from '../../data/chats'
import { Input } from '../input'
import { messageValidator } from '../../utils/validators'

const CLASS_NAME_INPUT_ERROR = 'input__error'

interface ChatProps {
	selectedChat: ChatType | null
	onSend: (event: PointerEvent | SubmitEvent) => void
	onModal: (event: Event, modal: string | undefined) => void
}

export class Chat extends Block<
	ChatProps,
	{
		message: Input
	},
	HTMLElement
> {
	constructor(props: ChatProps) {
		super({
			...props,
			onSend: (event: PointerEvent | SubmitEvent) => {
				event.preventDefault()
				const message = this.refs.message.value()
				const error = messageValidator(message)

				if (error) {
					console.error(error)
					this.refs.message.element.classList.add(CLASS_NAME_INPUT_ERROR)

					return
				}

				this.refs.message.element.classList.remove(CLASS_NAME_INPUT_ERROR)

				const data: { message: string } = {
					message
				}

				console.log(data)
			}
		}, 'flex')
	}

	protected init() {
		this.eventsElement = {
			load: () => {
				const scrollableDiv = document.getElementsByClassName('chat__body')

				if (scrollableDiv.length > 0) {
					scrollableDiv[0].scrollTop = scrollableDiv[0].scrollHeight
				}
			}
		}
	}

	protected render(): string {
		return template
	}
}
