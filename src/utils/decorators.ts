import Block, { PropsType, RefType } from '../core/Block'

export function SetTitle(title: string) {
	return function <
		T extends new (...args: any[]) => Block<PropsType, RefType, HTMLElement>
	>(constructor: T) {
		return class extends constructor {
			init() {
				super.init()
				document.title = title
			}
		}
	}
}
