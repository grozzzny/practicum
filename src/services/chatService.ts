import {
	ChatType,
	DataCreateChat,
	DataLogin, Message,
	QyeryParamsGetChats,
} from '../type'
import ChatAPI from '../api/ChatAPI'
import store from '../core/Store'
import ChatWS from '../api/ChatWS'
import { search } from './userService'

export const getChats = (data: QyeryParamsGetChats) => {
	return ChatAPI.getChats(data)
}

export const getUsers = (chatId: number) => {
	return ChatAPI.getUsers(chatId)
}

export const addUser = async (data: DataLogin) => {
	const { activeChat, chatUsers } = store.getState()
	const user = await search(data)
	await ChatAPI.addUser({
		users: [user.id],
		chatId: activeChat?.id!
	})
	chatUsers.push(user)
	store.set('chatUsers', chatUsers)
}

export const removeUser = async (data: DataLogin) => {
	const { activeChat, chatUsers } = store.getState()
	const user = await search(data)
	await ChatAPI.removeUser({
		users: [user.id],
		chatId: activeChat?.id!
	})
	const updatedChatUsers = chatUsers.filter((user) => user.id !== user.id)
	store.set('chatUsers', updatedChatUsers)
}

export const getToken = (chatId: number) => {
	return ChatAPI.getToken(chatId)
}

export const createChat = (data: DataCreateChat) => {
	return ChatAPI.createChat(data).then(async ({ id }) => {
		const chats = await getChats({})
		store.set('chats', chats)
		const activeChat = chats.find((chat) => chat.id === id)!
		setActiveChat(activeChat)
		return { id }
	})
}

export const sendMessage = async (message: string) => {
	await ChatWS.sendMessage(message)
}

export const updateMessages = (data: Message) => {
	console.log('data', data)
}

export const setActiveChat = async (chat: ChatType) => {
	ChatWS.dicsonnect()
	const state = store.getState()
	// store.set('messages', [])

	store.set('activeChat', chat)
	const chatUsers = await getUsers(chat.id)
	store.set('chatUsers', chatUsers)

	if (chatUsers.length > 1) {
		const { token } = await getToken(chat.id)
		ChatWS.connect({
			userId: state.user?.id!,
			chatId: state.activeChat?.id!,
			token: token
		})
	}
}
