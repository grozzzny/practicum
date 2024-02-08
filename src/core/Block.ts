import { nanoid } from 'nanoid'
import Handlebars from 'handlebars'
import EventBus from './EventBus'

export type RefType = {
	[key: string]:
		| Block<PropsType, RefType, HTMLElement | null>
		| HTMLElement
		| undefined
}

export type PropsType = Record<string | symbol, any>

export type EventName = keyof HTMLElementEventMap

export type EventListType = {
	[key in EventName]: (e: Event) => void
}

export type Events = Partial<EventListType>

class Block<
	Props extends PropsType = object,
	Refs extends RefType = RefType,
	Element extends HTMLElement | null = null
> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_CWU: 'flow:component-will-unmount',
		FLOW_RENDER: 'flow:render'
	}

	public id = nanoid(6)

	protected props: Props

	protected refs: Refs = {} as Refs

	protected eventsElement: Events = {}

	private children: Block[] = []

	private eventBus: EventBus

	private _element: Element = null as Element

	constructor(
		props: Props = {} as Props
	) {
		this.props = this._makePropsProxy(props)
		this.eventBus = new EventBus()
		this._registerEvents()
		this.eventBus.emit(Block.EVENTS.INIT)
	}

	_removeEventsElement() {
		;(Object.keys(this.eventsElement) as EventName[]).forEach((eventName) => {
			this._element!.removeEventListener(
				eventName,
				this.eventsElement[eventName]!
			)
		})
	}

	_addEventsElement() {
		;(Object.keys(this.eventsElement) as EventName[]).forEach((eventName) => {
			this._element!.addEventListener(
				eventName,
				this.eventsElement[eventName]!,
				true
			)
		})
	}

	_registerEvents() {
		this.eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
		this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
		this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
		this.eventBus.on(
			Block.EVENTS.FLOW_CWU,
			this._componentWillUnmount.bind(this)
		)
		this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
	}

	private _init() {
		this.init()
		this.eventBus.emit(Block.EVENTS.FLOW_RENDER)
	}

	protected init() {}

	_componentDidMount() {
		this._checkInDom()
		this.componentDidMount()
	}

	componentDidMount() {}

	public dispatchComponentDidMount() {
		this.eventBus.emit(Block.EVENTS.FLOW_CDM)
		Object.values(this.children).forEach((child) =>
			child.dispatchComponentDidMount()
		)
	}

	private _componentDidUpdate(oldProps: Props, newProps: Props) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus.emit(Block.EVENTS.FLOW_RENDER)
		}
	}

	protected componentDidUpdate(_oldProps: Props, _newProps: Props) {
		return true
	}

	_checkInDom() {
		const elementInDOM = document.body.contains(this._element)

		if (elementInDOM) {
			setTimeout(() => this._checkInDom(), 1000)

			return
		}

		this.eventBus.emit(Block.EVENTS.FLOW_CWU, this.props)
	}

	_componentWillUnmount() {
		this.componentWillUnmount()
	}

	componentWillUnmount() {}

	setProps = (nextProps: Partial<Props>) => {
		if (!nextProps) {
			return
		}

		Object.assign(this.props, nextProps)
	}

	get element() {
		return this._element
	}

	private _render() {
		const fragment = this.compile(this.render(), this.props)
		const newElement = fragment.firstElementChild as HTMLElement

		if (this._element) {
			this._removeEventsElement()
			newElement.style.display = this._element.style.display
			this._element.replaceWith(newElement)
		}

		this._element = newElement as Element
		this._addEventsElement()
	}

	private compile(template: string, context: any) {
		const contextAndStubs = { ...context, __refs: this.refs }

		Object.entries(this.children).forEach(([key, child]) => {
			contextAndStubs[key] = `<div data-id="${child.id}"></div>`
		})

		const html = Handlebars.compile(template)(contextAndStubs)
		const temp = document.createElement('template')

		temp.innerHTML = html
		contextAndStubs.__children?.forEach(
			({ embed }: { embed: (content: object) => object }) => {
				embed(temp.content)
			}
		)

		Object.values(this.children).forEach((child) => {
			const stub = temp.content.querySelector(`[data-id="${child.id}"]`)

			stub?.replaceWith(child.getContent()!)
		})

		this.refs = Array.from(temp.content.querySelectorAll('[ref]')).reduce(
			(list, element) => {
				const key = element.getAttribute('ref')!
				list[key] = element
				element.removeAttribute('ref')
				return list
			},
			contextAndStubs.__refs
		)

		return temp.content
	}

	protected render(): string {
		return ''
	}

	getContent() {
		if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			setTimeout(() => {
				if (
					this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
				) {
					this.dispatchComponentDidMount()
				}
			}, 100)
		}

		return this._element
	}

	_makePropsProxy(props: Props) {
		const self = this

		return new Proxy(props, {
			get(target, prop: keyof Props) {
				const value = target[prop]

				return typeof value === 'function' ? value.bind(target) : value
			},
			set(target, prop: keyof Props, value) {
				const oldTarget = { ...target }

				target[prop] = value
				self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target)

				return true
			},
			deleteProperty() {
				throw new Error('No access')
			}
		})
	}
}

export default Block
