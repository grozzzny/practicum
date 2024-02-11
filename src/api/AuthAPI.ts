import { BaseAPI } from './BaseAPI'
import { DataLoginForm, DataRegistrationForm, User } from '../type'

class AuthAPI extends BaseAPI {
	constructor() {
		super('/auth')
	}

	public signup(data: DataRegistrationForm) {
		return this.transport().post<{ id: number }>('/signup', {
			data
		})
	}

	public signin(data: DataLoginForm) {
		return this.transport().post<unknown>('/signin', { data })
	}

	public getUser(): Promise<User> {
		return this.transport().get<User>('/user')
	}

	public logout() {
		return this.transport().post<unknown>('/logout')
	}
}

export default new AuthAPI()
