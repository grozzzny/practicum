export type AppState = {
	error: string | null
	user: User | null
	chatUsers: User[]
	messages: MessageType[]
	activeChat: ChatType | null
	chats: ChatType[]
}

export type DataLoginForm = {
	login: string
	password: string
}

export type DataLogin = {
	login: string
}

export type User = {
	id: number
	first_name: string
	second_name: string
	display_name: string
	phone: string
	login: string
	avatar: string
	email: string
}

export type DataChatId = { chatId: number }

export type DataUserChat = {
	users: number[]
	chatId: number
}

export type DataProfileEditForm = Omit<User, 'id' | 'avatar'>

export type DataFormOneField = {
	value: string
}

export type DataAvatarForm = {
	avatar: File
}

type LastMessage = {
	user: User
	time: string
	content: string
}

export type ChatType = {
	id: number
	title: string
	avatar: null | string
	unread_count: number
	last_message: LastMessage | null
}

export type DataRegistrationForm = {
	email: string
	login: string
	first_name: string
	second_name: string
	phone: string
	password: string
}

export type DataProfilePasswordForm = {
	oldPassword: string
	newPassword: string
}

export type QyeryParamsGetChats = {
	offset?: string
	limit?: string
	title?: string
}

export type DataCreateChat = {
	title: string
}

export type MessageType = {
	chat_id: number
	content: string
	id: number
	is_read: boolean
	time: string
	type: string
	user_id: number
	file?: null | string
}

export type DataFormSend = {
	message: string
}
