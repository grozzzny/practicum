import {
	ChatType,
	DataCreateChat,
	DataLogin,
	MessageType,
	QyeryParamsGetChats
} from '../type'
import ChatAPI from '../api/ChatAPI'
import store from '../core/Store'
import ChatWS from '../api/ChatWS'
import { search } from './userService'
import { sanitizeInput } from '../utils/helper'
import { ErrorAPI } from '../utils/HTTPTransport'

export const getChats = (data: QyeryParamsGetChats) => {
	return ChatAPI.getChats(data)
}

export const getUsers = (chatId: number) => {
	return ChatAPI.getUsers(chatId)
}

export const addUser = async (data: DataLogin) => {
	const { activeChat, chatUsers } = store.getState()
	const user = await search(data)
	if (!activeChat) throw new ErrorAPI('Chat is not selected')
	await ChatAPI.addUser({
		users: [user.id],
		chatId: activeChat.id
	})
	chatUsers.push(user)
	store.set('chatUsers', chatUsers)
}

export const removeUser = async (data: DataLogin) => {
	const { activeChat, chatUsers } = store.getState()
	const user = await search(data)
	if (!activeChat) throw new ErrorAPI('Chat is not selected')
	await ChatAPI.removeUser({
		users: [user.id],
		chatId: activeChat.id
	})
	const updatedChatUsers = chatUsers.filter((user) => user.id !== user.id)
	store.set('chatUsers', updatedChatUsers)
}

export const getToken = (chatId: number) => {
	return ChatAPI.getToken(chatId)
}

export const setActiveChat = async (chat: ChatType) => {
	ChatWS.dicsonnect()
	const state = store.getState()
	store.set('messages', [])

	store.set('activeChat', chat)
	const chatUsers = await getUsers(chat.id)
	store.set('chatUsers', chatUsers)

	if (chatUsers.length > 1) {
		const { token } = await getToken(chat.id)
		if (!state.user) throw new ErrorAPI('Not found current user')
		if (!state.activeChat) throw new ErrorAPI('Not selected chat')
		ChatWS.connect({
			userId: state.user.id,
			chatId: state.activeChat.id,
			token: token
		})
	}
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
	await ChatWS.sendMessage(sanitizeInput(message))
}

export const updateMessages = (data: MessageType | MessageType[]) => {
	const oldMessages = store.getState().messages
	let newMessages: MessageType[] = []
	if (Array.isArray(data)) {
		newMessages = [...oldMessages, ...data]
		const sort = (a: Record<string, any>, b: Record<string, any>) =>
			b.time - a.time ? 1 : -1
		newMessages.sort(sort)
	} else {
		newMessages = [...oldMessages, data]
	}

	store.set('messages', newMessages)
}
