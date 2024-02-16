import { expect } from 'chai'
import sinon from 'sinon'
import Block, { RefType } from './Block'

interface Props {
	text?: string
	eventClick?: (e: Event) => void
}

class PageClass extends Block<Props, RefType, HTMLElement> {
	constructor(props: Props) {
		super({
			...props
		})
	}

	protected init() {
		this.eventsElement = {
			click: this.props.eventClick
		}
	}

	protected render(): string {
		return `<div>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </div>`
	}
}

describe('Block', () => {
	it('Must create a component with a state from the constructor', () => {
		const text = 'Hello'
		const pageComponent = new PageClass({ text })

		const spanText =
			pageComponent.element?.querySelector('#test-text')?.innerHTML

		expect(spanText).to.be.eq(text)
	})

	it('The component must have a reactive behavior', () => {
		const text = 'new value'
		const pageComponent = new PageClass({ text: 'Hello' })

		pageComponent.setProps({ text })
		const spanText =
			pageComponent.element?.querySelector('#test-text')?.innerHTML

		expect(spanText).to.be.eq(text)
	})

	it('The component must set events on the element', () => {
		const handlerStub = sinon.stub()
		const pageComponent = new PageClass({
			eventClick: handlerStub
		})

		const event = new MouseEvent('click')
		pageComponent.element?.dispatchEvent(event)

		expect(handlerStub.calledOnce).to.be.true
	})

	it('The component should call the dispatch ComponentDidMount method', () => {
		const clock = sinon.useFakeTimers()
		const pageComponent = new PageClass({})

		const spyCDM = sinon.spy(pageComponent, 'componentDidMount')

		const element = pageComponent.getContent()
		document.body.append(element!)
		clock.next()

		expect(spyCDM.calledOnce).to.be.true
	})
})
