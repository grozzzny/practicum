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
	first_name: string
	second_name: string
	display_name: string
	phone: string
	login: string
	avatar: string
	email: string
}

export type DataProfileEditForm = Omit<User, 'id' | 'avatar'>

type LastMessage = {
	user: User
	time: string
	content: string
}

export type Chat = {
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
