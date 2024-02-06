export type AppState = {
	error: string | null
	user: User | null
	isOpenDialogChat: boolean
	chats: Chat[]
}

export type DataLoginForm = {
	login: string
	password: string
}

export type User = {
	id: number
	login: string
	firstName: string
	secondName: string
	displayName: string
	avatar: string
	phone: string
	email: string
}

type LastMessage = {
	user: User
	time: string
	content: string
}

export type Chat = {
	id: number
	title: string
	avatar: null | string
	unreadCount: number
	lastMessage: LastMessage | null
}

export type DataRegistrationForm = {
	email: string
	login: string
	first_name: string
	second_name: string
	phone: string
	password: string
}
