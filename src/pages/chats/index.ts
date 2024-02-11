import template from './chats.hbs?raw'
import Block from '../../core/Block'
import {
	Chat,
	Side,
	ModalAddChat,
	ModalAddUser,
	ModalRemoveUser
} from '../../components'
import { SetTitle } from '../../utils/decorators'

interface ChatPageProps {
	onModal: (event: Event, modalName: string | undefined) => void
}

@SetTitle('Messenger')
export class ChatsPage extends Block<
	ChatPageProps,
	{
		side: Side
		chat: Chat
		modalAddUser: ModalAddUser
		modalAddChat: ModalAddChat
		modalRemoveUser: ModalRemoveUser
	},
	HTMLElement
> {
	constructor(props: ChatPageProps) {
		super({
			...props,
			onModal: (event, modalName) => {
				event.preventDefault()
				Object.entries(this.refs).forEach(([_name, block]) => {
					if ('modalName' in block) {
						block.setProps({
							modalVisible: block.modalName === modalName
						})
					}
				})
			}
		})
	}

	protected render(): string {
		return template
	}
}
