import store, { StoreEvents } from '../core/Store'
import Block, { PropsType, RefType } from '../core/Block'
import isEqual from './isEqual'
import { AppState } from '../type'

export function connect(
	Component: typeof Block<PropsType, RefType, HTMLElement>,
	mapStateToProps: (state: AppState) => Partial<AppState>
) {
	return class extends Component {
		constructor(props: PropsType = {}) {
			let state = mapStateToProps(store.getState())
			super({ ...props, ...state })

			store.on(StoreEvents.Updated, () => {
				const newState = mapStateToProps(store.getState())

				if (!isEqual(state, newState)) {
					this.setProps({ ...newState })
				}
				state = newState
			})
		}
	}
}
