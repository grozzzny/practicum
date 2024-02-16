import { initApp } from './services/initApp'
import { registerComponents, registerPartials } from './core/resgiterComponent'

const init = () => {
	registerPartials()
	registerComponents()
	initApp()
}

document.addEventListener('DOMContentLoaded', init)
