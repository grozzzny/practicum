import { DataCreateChat, QyeryParamsGetChats } from '../type'
import ChatAPI from '../api/ChatAPI'
import store from '../core/Store'

export const getChats = (data: QyeryParamsGetChats) => {
	return ChatAPI.getChats(data)
}

export const createChat = (data: DataCreateChat) => {
	return ChatAPI.createChat(data).then(async ({ id }) => {
		const chats = await getChats({})
		store.set('chats', chats)
		store.set(
			'activeChat',
			chats.find((chat) => chat.id === id)!
		)
		return { id }
	})
}
