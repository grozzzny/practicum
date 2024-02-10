type Arguments = unknown[]
type EventList = Record<string, Arguments>
type Listener<Arg extends Arguments> = (...args: Arg) => void

export default class EventBus<Events extends EventList = EventList> {
	private listeners: {
		[EventName in keyof Events]?: ((...args: Events[EventName]) => void)[]
	} = {}

	on<EventName extends keyof Events>(event: EventName, callback: Listener<Events[EventName]>): void {
		if (!this.listeners[event]) {
			this.listeners[event] = []
		}

		this.listeners[event]!.push(callback)
	}

	off<EventName extends keyof Events>(event: EventName, callback: Listener<Events[EventName]>): void {
		if (!this.listeners[event]) {
			throw new Error(`No event: ${String(event)}`)
		}

		this.listeners[event] = this.listeners[event]!.filter(
			(listener) => listener !== callback
		)
	}

	hasEvent(event: keyof Events): boolean {
		return !!this.listeners[event]
	}

	emit<EventName extends keyof Events>(event: EventName, ...args: Events[EventName]): void {
		if (!this.hasEvent(event)) {
			throw new Error(`No event: ${String(event)}`)
		}

		this.listeners[event]!.forEach((listener) => {
			listener(...args)
		})
	}
}
