import { BaseAPI } from './BaseAPI'
import { User } from './AuthAPI'

class UserAPI extends BaseAPI {
	constructor() {
		super('/user')
	}

	public changeProfile(data: Omit<User, 'id' | 'avatar'>) {
		return this.transport().put<User>('/profile', {
			data
		})
	}

	public changeAvatar(file: File) {
		const data = new FormData()
		data.append('avatar', file)
		return this.transport().put<unknown>('/profile/avatar', {
			data
		})
	}

	public changePassword(data: { oldPassword: string; newPassword: string }) {
		return this.transport().put<unknown>('/password', {
			data
		})
	}

	public getUser(id: string) {
		return this.transport().get<User>(`/${id}`)
	}

	public search(data: { login: string }) {
		return this.transport().post<User[]>('/search', {
			data
		})
	}
}

export default new UserAPI()
