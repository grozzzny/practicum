import { WSEvents, WSTransport } from '../utils/WSTransport'
import { updateMessages } from '../services/chatService'

type SettingsConnectWS = {
	userId: number
	chatId: number
	token: string
}

class ChatWS {
	public transport: WSTransport | null = null

	public async connect({ userId, chatId, token }: SettingsConnectWS) {
		try {
			this.transport = new WSTransport(
				`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
			)

			this.transport.on(WSEvents.Connected, async () => {
				console.log('WSEvents.Connected')
				this.transport?.on(WSEvents.Message, updateMessages)
				this.getMessages('0')
				this.getMessages('20')
			})

			this.transport.on(WSEvents.Close, () => {
				console.log('WSEvents.Close')
			})

			await this.transport.connect()
		} catch (e) {
			console.error(e as string)
		}
	}

	public dicsonnect() {
		if (this.transport) {
			this.transport.close()
			this.transport = null
		}
	}

	public sendMessage(text: string) {
		if (this.transport) {
			const data = {
				type: 'message',
				content: text
			}

			this.transport.send(data)
		}
	}

	public getMessages(offset = '0') {
		if (this.transport) {
			this.transport.send({
				type: 'get old',
				content: offset
			})
		}
	}
}

export default new ChatWS()
