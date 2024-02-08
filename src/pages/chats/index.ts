import template from './chats.hbs?raw'
import Block from '../../core/Block'
import { Chat, ModalAddUser, ModalRemoveUser, Side } from '../../components'
import { SetTitle } from '../../utils/decorators'
import { connect } from '../../utils/connect'
import { ChatType, User } from '../../type'

interface ChatPageProps {
	onHandler: (event: Event, chat: ChatType) => void
	chats: ChatType[]
	onModal: (event: Event, modalName: string | undefined) => void
	user: User
}

@SetTitle('Messenger')
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
	constructor(props: ChatPageProps) {
		super(
			{
				...props,
				onHandler: (event, chat) => {
					event.preventDefault()
					this.refs.chat.setProps({
						selectedChat: chat
					})
				},
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
			}
		)
	}

	protected render(): string {
		return template
	}
}

export const ChatsPageConnect = connect(ChatsPage, (state) => ({
	user: state.user,
	chats: state.chats,
}))
