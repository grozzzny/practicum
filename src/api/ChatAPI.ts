import { BaseAPI } from './BaseAPI'
import { User } from './AuthAPI'

class ChatAPI extends BaseAPI {
	constructor() {
		super('/chats')
	}

	public getChats(data: { offset?: string; limit?: string; title?: string }) {
		return this.transport().get<Chat[]>('', {
			data
		})
	}

	public createChat(data: { title: string }) {
		return this.transport().post<unknown>('', {
			data
		})
	}

	public deleteChat(data: { chatId: number }) {
		return this.transport().delete<{
			userId: number
			result: {
				id: number
				title: string
				avatar: string
				created_by: number
			}
		}>('', {
			data
		})
	}

	public getUsers(
		id: string,
		data: { offset?: number; limit?: number; name: string; email: string }
	) {
		return this.transport().get<User[]>(`/${id}/users`, {
			data
		})
	}

	public getNewMessagesCount(id: string) {
		return this.transport().get<{ unread_count: number }>(`/new/${id}`)
	}

	public addAvatar(file: File) {
		const data = new FormData()
		data.append('avatar', file)
		return this.transport().put<unknown>(`/avatar`, { data })
	}

	public addUser(data: { users: number[]; chatId: number }) {
		return this.transport().put<unknown>(`/users`, { data })
	}
}

export type Chat = {
	id: number
	title: string
	avatar: string
	unread_count: number
	created_by: number
	last_message?: {
		user: {
			first_name: string
			second_name: string
			avatar: string
			email: string
			login: string
			phone: string
		}
		time: string
		content: string
	}
}

export default new ChatAPI()
