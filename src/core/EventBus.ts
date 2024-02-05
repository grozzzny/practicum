export type Listener<Args extends unknown[] = any[]> = (...args: Args) => void

export default class EventBus<
	Event extends string = string,
	Method extends { [Key in Event]: unknown[] } = Record<Event, any[]>
> {
	private listeners: { [key in Event]?: Listener<Method[Event]>[] } = {}

	on(event: Event, callback: Listener<Method[Event]>) {
		if (!this.listeners[event]) {
			this.listeners[event] = []
		}

		this.listeners[event]!.push(callback)
	}

	off(event: Event, callback: Listener<Method[Event]>) {
		if (!this.listeners[event]) {
			throw new Error(`No event: ${event}`)
		}

		this.listeners[event] = this.listeners[event]!.filter(
			(listener) => listener !== callback
		)
	}

	hasEvent(event: Event): boolean {
		return !!this.listeners[event]
	}

	emit(event: Event, ...args: Method[Event]) {
		if (!this.hasEvent(event)) {
			throw new Error(`No event: ${event}`)
		}

		this.listeners[event]!.forEach((listener) => {
			listener(...args)
		})
	}
}
