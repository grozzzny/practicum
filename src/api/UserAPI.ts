import { BaseAPI } from './BaseAPI'
import {
	DataLogin,
	DataProfileEditForm,
	DataProfilePasswordForm,
	User
} from '../type'

class UserAPI extends BaseAPI {
	constructor() {
		super('/user')
	}

	public changeProfile(data: DataProfileEditForm) {
		return this.transport().put<User>('/profile', {
			data
		})
	}

	public changeAvatar(file: File) {
		const data = new FormData()
		data.append('avatar', file)
		return this.transport().put<User>('/profile/avatar', {
			data
		})
	}

	public changePassword(data: DataProfilePasswordForm) {
		return this.transport().put<unknown>('/password', {
			data
		})
	}

	public getUser(id: string) {
		return this.transport().get<User>(`/${id}`)
	}

	public search(data: DataLogin) {
		return this.transport().post<User[]>('/search', {
			data
		})
	}
}

export default new UserAPI()
