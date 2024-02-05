import AuthAPI from '../api/AuthAPI'

export const isGuest = async(): Promise<boolean> => {
	try {
		await AuthAPI.getUser()
		return true
	} catch (e) {
		console.error(e)
		return false
	}
}
