import AuthAPI from '../api/AuthAPI'
import { DataLoginForm } from '../components/formLogin'
import { DataRegistrationForm } from '../components/formRegistration'

export const isGuest = async(): Promise<boolean> => {
	try {
		await AuthAPI.getUser()
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
