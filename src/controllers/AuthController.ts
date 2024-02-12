import router from '../core/Router'
import { logout, signin, signup } from '../services/authService'
import { DataLoginForm, DataRegistrationForm } from '../type'

class AuthController {
	public async signup(data: DataRegistrationForm) {
		await signup(data)
		router.go('/messenger')
	}

	public async signin(data: DataLoginForm) {
		await signin(data)
		router.go('/messenger')
	}

	public async logout() {
		await logout()
		router.go('/')
	}
}

export default new AuthController()
