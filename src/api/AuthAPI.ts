import { BaseAPI } from './BaseAPI'

class AuthAPI extends BaseAPI {
	constructor() {
		super('/auth')
	}

	public signup(data: SignUpData) {
		return this.transport().post<{ id: number }>('/signup', {
			data
		})
	}

	public signin(data: {
		login: string
		password: string
	}) {
		return this.transport().post<unknown>('/signin', { data })
	}

	public getUser(): Promise<User> {
		return this.transport().get<User>('/user')
	}

	public logout() {
		return this.transport().post<unknown>('/logout')
	}
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

export type SignUpData = {
	first_name: string
	second_name: string
	login: string
	email: string
	password: string
	phone: string
}

export default new AuthAPI()
