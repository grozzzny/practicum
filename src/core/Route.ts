import { render } from '../utils/render'
import Block, { PropsType, RefType } from './Block'
import { Middleware } from './Router'

export default class Route {
	private block: Block<PropsType, RefType, HTMLElement> | null = null

	constructor(
		private pathname: string | RegExp,
		private readonly blockClass: typeof Block<PropsType, RefType, HTMLElement>,
		private readonly props: PropsType,
		readonly middlewares: Middleware[] = []
	) {}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this.pathname = pathname
			this.render()
		}
	}

	leave() {
		if (this.block) {
			this.block = null
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
		}
	}
}
