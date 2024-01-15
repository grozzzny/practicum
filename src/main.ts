import Handlebars from 'handlebars'
import * as Components from './components'
import * as Partials from './partials'
import { registerComponent } from './core/resgiterComponent'
import { PagesName, navigate } from './core/navigate'
import Block from './core/Block'

Object.entries(Partials as Record<string, string>).forEach(
	([name, component]) => {
		Handlebars.registerPartial(name, component)
	}
)

Object.entries(Components as Record<string, typeof Block>).forEach(
	([name, component]) => {
		registerComponent(name, component)
	}
)

document.addEventListener('DOMContentLoaded', () => navigate('login'))

document.addEventListener('click', (e) => {
	const target = e.target as HTMLElement
	const page = target.getAttribute('page') as PagesName

	if (page) {
		e.preventDefault()
		e.stopImmediatePropagation()
		navigate(page)
	}
})
