import Handlebars, { HelperOptions } from 'handlebars'
import Block, { PropsType, RefType } from './Block'
import * as Partials from '../partials'
import * as Components from '../components'

export function registerPartials() {
	Object.entries(Partials as Record<string, string>).forEach(
		([name, component]) => {
			Handlebars.registerPartial(name, component)
		}
	)
}

export function registerComponents() {
	Object.entries(Components as Record<string, typeof Block>).forEach(
		([name, component]) => {
			registerComponent(name, component)
		}
	)
}

export function registerComponent(
	name: string,
	Component: typeof Block<PropsType, RefType, HTMLElement | null>
) {
	if (name in Handlebars.helpers) {
		throw new Error(`The ${name} component is already registered!`)
	}

	Handlebars.registerHelper(
		name,
		function (this: unknown, { hash, data, fn }: HelperOptions) {
			const component = new Component(hash)
			const dataAttribute = `data-id="${component.id}"`

			if ('ref' in hash) {
				;(data.root.__refs = data.root.__refs || {})[hash.ref] = component
			}

			;(data.root.__children = data.root.__children || []).push({
				component,
				embed(fragment: DocumentFragment) {
					const stub = fragment.querySelector(`[${dataAttribute}]`)

					if (!stub) {
						return
					}

					component.getContent()?.append(...Array.from(stub.childNodes))
					stub.replaceWith(component.getContent()!)
				}
			})

			const contents = fn ? fn(this) : ''

			return `<div ${dataAttribute}>${contents}</div>`
		}
	)
}
