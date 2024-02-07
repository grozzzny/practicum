import AuthAPI from '../api/AuthAPI'
import { DataLoginForm, DataRegistrationForm } from '../type'
import store from '../core/Store'

export const isGuest = async(): Promise<boolean> => {
	try {
		const { user: userState } = store.getState()
		if(userState) return false
		const user = await AuthAPI.getUser()
		store.set('user', user)
		return false
	} catch (e) {
		console.error(e)
		return true
	}
}

export const signup = (data: DataRegistrationForm) => {
	return AuthAPI.signup(data)
}

export const signin = (data: DataLoginForm) => {
	return AuthAPI.signin(data)
}

export const logout = () => {
	return AuthAPI.logout()
}
