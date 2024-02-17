import sinon from 'sinon'
import { HTTPTransport, Methods } from './HTTPTransport'
import { expect } from 'chai'

describe('HTTPTransport', () => {
	afterEach(() => {
		sinon.restore()
	})
	it('Must form a query string', async () => {
		const transport = new HTTPTransport('/test')
		const requestStub = sinon.stub(transport, 'request').resolves()

		await transport.get('', { data: { a: '1', b: '2 2' } })

		expect(requestStub.calledWithMatch(`?a=1&b=2%202`, Methods.GET)).to.be.true
	})
})
