import { BaseAPI } from './BaseAPI'
import { ChatType, DataCreateChat, QyeryParamsGetChats, User } from '../type'

class ChatAPI extends BaseAPI {
	constructor() {
		super('/chats')
	}

	public getChats(data: QyeryParamsGetChats) {
		return this.transport().get<ChatType[]>('', {
			data
		})
	}

	public createChat(data: DataCreateChat) {
		return this.transport().post<{id: number}>('', {
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

export default new ChatAPI()
