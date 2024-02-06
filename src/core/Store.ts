import EventBus from './EventBus'
import { set } from '../utils/helper'
import { AppState } from '../type'

export enum StoreEvents {
	Updated = 'Updated'
}

class Store extends EventBus {
	private state: AppState = {
		error: null,
		user: null,
		isOpenDialogChat: false,
		chats: []
	}

	public getState() {
		return this.state
	}

	public set<K extends keyof AppState>(path: K, value: AppState[K]): void {
		set(this.state, path, value)
		this.emit(StoreEvents.Updated)
	}
}

export default new Store()
