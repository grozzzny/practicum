import router from './Router'
import { createSandbox } from 'sinon'
import { expect } from 'chai'
import { ChatsPage } from '../pages'

describe('Router', () => {
	const sandbox = createSandbox()

	beforeEach(function () {
		router.routes = []
		router.history = window.history
		router.currentRoute = null
		router.rootQuery = '#app'
	})

	afterEach(function () {
		sandbox.restore()
	})

	it('should add a route to the routes list', () => {
		const initialRoutesCount = router.routes.length
		router.use('/messenger', ChatsPage)
		const updatedRoutesCount = router.routes.length

		expect(updatedRoutesCount).to.equal(initialRoutesCount + 1)
	})

	it('should navigate to the specified route', () => {
		router.use('/messenger', ChatsPage)
		const initialCurrentRoute = router.currentRoute

		router.go('/messenger')

		const updatedCurrentRoute = router.currentRoute

		expect(updatedCurrentRoute).to.not.equal(initialCurrentRoute)
	})

	it('should call middleware when changing route', () => {
		const middlewareSpy = sandbox.spy()
		router.use('/messenger', ChatsPage, [middlewareSpy])

		router.go('/messenger')

		expect(middlewareSpy.calledOnce).to.be.true
	})

	it('should return the correct route for the specified path', () => {
		router.use('/messenger', ChatsPage)

		const foundRoute = router.getRoute('/messenger')
		const notFoundRoute = router.getRoute('/profile')

		expect(foundRoute).to.exist
		expect(notFoundRoute).to.not.exist
	})
})
