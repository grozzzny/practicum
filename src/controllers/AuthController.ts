import router from '../core/Router'
import { DataLoginForm } from '../components/formLogin'
import { signin } from '../services/authService'

class AuthController {
	public async signin(data: DataLoginForm) {
		await signin(data)
		router.go('/messenger')
	}
}

export default new AuthController()
