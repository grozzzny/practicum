import EventBus from './EventBus'
import { set } from '../utils/helper'
import { AppState } from '../type'

export enum StoreEvents {
	Updated = 'Updated'
}

type StoreEventMethods = {
	[StoreEvents.Updated]: [void]
}

class Store extends EventBus<StoreEventMethods> {
	private state: AppState = {
		error: null,
		user: null,
		activeChat: null,
		chatUsers: [],
		messages: [],
		chats: []
	}

	public getState() {
		return this.state
	}

	public set<K extends keyof AppState>(path: K, value: AppState[K]): void {
		set(this.state, path, value)
		if (this.hasEvent(StoreEvents.Updated)) {
			this.emit(StoreEvents.Updated)
		}
	}
}

export default new Store()
