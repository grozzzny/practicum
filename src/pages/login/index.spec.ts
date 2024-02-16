import { expect } from 'chai'
import { LoginPage } from './index'
import {
	registerComponents,
	registerPartials
} from '../../core/resgiterComponent'

describe('Login Page', () => {
	before(() => {
		registerPartials()
		registerComponents()
	})

	it('Show error login', () => {
		const loginPage = new LoginPage()
		const component = loginPage.getContent()!

		const input = component.querySelector<HTMLInputElement>('[name="login"]')!
		input.value = '22'

		const formLogin = component.querySelector<HTMLFormElement>('#formLogin')!
		formLogin.dispatchEvent(new window.Event('submit'))

		const parent = input.parentElement!.parentElement!
		const errorElement = parent.querySelector<HTMLElement>('.field__error')!

		expect(errorElement.innerHTML).to.eql(
			'Length of login should be between 3 and 20 characters'
		)
	})
})
