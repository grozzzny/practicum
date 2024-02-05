import { render } from '../utils/render'
import Block, { PropsType, RefType } from './Block'

export default class Route {
	private block: Block<PropsType, RefType, HTMLElement> | null = null

	constructor(
		private pathname: string | RegExp,
		private readonly blockClass: typeof Block<PropsType, RefType, HTMLElement>,
		private readonly props: PropsType
	) {}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this.pathname = pathname
			this.render()
		}
	}

	leave() {
		if (this.block) {
			this.block.hide()
		}
	}

	match(pathname: string): boolean {
		if (typeof this.pathname === 'string') {
			return this.pathname === pathname
		}
		return !!pathname.match(this.pathname)
	}

	render() {
		if (!this.block) {
			this.block = new this.blockClass()
			render(this.props.rootQuery, this.block)
			return
		}

		this.block.show()
	}
}
