import { QyeryParamsGetChats } from '../type'
import ChatAPI from '../api/ChatAPI'

export const getChats = (data: QyeryParamsGetChats) => {
	return ChatAPI.getChats(data)
}
