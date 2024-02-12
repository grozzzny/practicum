import Handlebars from 'handlebars'
import * as Components from './components'
import * as Partials from './partials'
import { registerComponent } from './core/resgiterComponent'
import Block from './core/Block'
import { initApp } from './services/initApp'

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

document.addEventListener('DOMContentLoaded', initApp)
