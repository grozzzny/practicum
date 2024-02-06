import AuthAPI from '../api/AuthAPI'
import { DataLoginForm } from '../components/formLogin'

export const isGuest = async(): Promise<boolean> => {
	try {
		await AuthAPI.getUser()
		return false
	} catch (e) {
		console.error(e)
		return true
	}
}

export const signin = (data: DataLoginForm) => {
	return AuthAPI.signin(data)
}
