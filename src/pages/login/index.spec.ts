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

		const form = component.querySelector<HTMLFormElement>('#formLogin')!
		form.dispatchEvent(new window.Event('submit'))

		const field = input.parentElement!.parentElement!
		const error = field.querySelector<HTMLElement>('.field__error')!

		expect(error.innerHTML).to.eql(
			'Length of login should be between 3 and 20 characters'
		)
	})
})
