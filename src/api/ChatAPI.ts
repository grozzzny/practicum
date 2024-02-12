import { BaseAPI } from './BaseAPI'
import {
	ChatType,
	DataUserChat,
	DataChatId,
	DataCreateChat,
	QyeryParamsGetChats,
	User
} from '../type'

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
		return this.transport().post<{ id: number }>('', {
			data
		})
	}

	public getToken(chatId: number) {
		return this.transport().post<{ token: string }>(`/token/${chatId}`)
	}

	public deleteChat(data: DataChatId) {
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
		id: number,
		data?: { offset?: number; limit?: number; name?: string; email?: string }
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

	public addUser(data: DataUserChat) {
		return this.transport().put<unknown>(`/users`, { data })
	}

	public removeUser(data: DataUserChat) {
		return this.transport().delete<unknown>(`/users`, { data })
	}
}

export default new ChatAPI()
