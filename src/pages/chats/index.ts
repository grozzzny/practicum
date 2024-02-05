import template from './chats.hbs?raw'
import Block from '../../core/Block'
import { Chat, ModalAddUser, ModalRemoveUser, Side } from '../../components'
import chats, { ChatType } from '../../data/chats'

interface ChatPageProps {
	onHandler: (event: Event, chat: ChatType) => void
	chats: ChatType[]
	onModal: (event: Event, modalName: string | undefined) => void
}

export class ChatsPage extends Block<
	ChatPageProps,
	{
		side: Side
		chat: Chat
		modalAddUser: ModalAddUser
		modalRemoveUser: ModalRemoveUser
	},
	HTMLElement
> {
	constructor() {
		super({
			onHandler: (event, chat) => {
				event.preventDefault()
				this.refs.chat.setProps({
					selectedChat: chat
				})
			},
			chats,
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
