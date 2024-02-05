import Block, { PropsType, RefType } from './Block'
import Route from './Route'

export type Middleware = (router: Router, next: () => void) => void

class Router {
	private routes: Route[] = []
	private history: History
	private currentRoute: null | Route = null

	constructor(private rootQuery: string | null = null) {
		this.history = window.history
	}

	use(
		pathname: string | RegExp,
		blockClass: typeof Block<PropsType, RefType, HTMLElement>,
		middlewares: Middleware[] = [(_router, next) => next()]
	) {
		const route = new Route(
			pathname,
			blockClass,
			{ rootQuery: this.rootQuery },
			middlewares
		)

		this.routes.push(route)

		return this
	}

	async start() {
		window.addEventListener('popstate', (event: PopStateEvent) => {
			const window = event.target as Window
			this.onRoute(window.location.pathname)
		})

		this.onRoute(window.location.pathname)
	}

	private onRoute(pathname: string) {
		const route = this.getRoute(pathname)
		if (!route) {
			return
		}

		if (this.currentRoute && this.currentRoute !== route) {
			this.currentRoute.leave()
		}

		this.currentRoute = route

		const next = () => route.render()

		route.middlewares.reduceRight((next: () => void, middleware) => {
			return () => middleware(this, next)
		}, next)()
	}

	go(pathname: string) {
		this.history.pushState({}, '', pathname)
		this.onRoute(pathname)
	}

	back() {
		this.history.back()
	}

	forward() {
		this.history.forward()
	}

	getRoute(pathname: string) {
		return this.routes.find((route) => route.match(pathname))
	}
}

export default new Router('#app')
