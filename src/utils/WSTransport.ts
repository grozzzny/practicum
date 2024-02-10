import EventBus from '../core/EventBus'
import { MessageType } from '../type'

export enum WSEvents {
	Error = 'error',
	Close = 'close',
	Message = 'message',
	Connected = 'connected'
}

type WSEventMethods = {
	[WSEvents.Message]: [MessageType]
	[WSEvents.Error]: [Event]
	[WSEvents.Connected]: [void]
	[WSEvents.Close]: [void]
}

type SendData = string | object

export class WSTransport extends EventBus<WSEventMethods> {
	private socket?: WebSocket
	private pingInterval?: number
	private readonly pingIntervalTime = 30000

	constructor(private readonly url: string) {
		super()
	}

	public send(data: SendData) {
		if (!this.socket) {
			throw new Error('Socket is not connected')
		}
		this.socket.send(JSON.stringify(data))
	}

	public sendBuffer(buffer: ArrayBuffer) {
		if (!this.socket) {
			throw new Error('Socket is not connected')
		}
		this.socket.send(buffer)
	}

	public sendIntview(intview: Uint32Array) {
		if (!this.socket) {
			throw new Error('Socket is not connected')
		}
		this.socket.send(intview)
	}

	public sendBlob(blob: Blob) {
		if (!this.socket) {
			throw new Error('Socket is not connected')
		}
		this.socket.send(blob)
	}

	public connect(): Promise<void> {
		if (this.socket) {
			throw new Error('The socket is already connected')
		}
		this.socket = new WebSocket(this.url)
		this.subscribe(this.socket)
		this.setupPing()

		return new Promise((resolve, reject) => {
			this.on(WSEvents.Error, reject)
			this.on(WSEvents.Connected, () => {
				this.off(WSEvents.Error, reject)
				resolve()
			})
		})
	}

	public close() {
		this.socket?.close()
		clearInterval(this.pingInterval)
	}

	private setupPing() {
		this.pingInterval = setInterval(() => {
			this.send({
				type: 'ping'
			})
		}, this.pingIntervalTime)

		this.on(WSEvents.Close, () => {
			this.pingInterval = undefined
		})
	}

	private subscribe(socket: WebSocket) {
		socket.addEventListener('open', () => {
			this.emit(WSEvents.Connected)
		})

		socket.addEventListener('close', () => {
			this.emit(WSEvents.Close)
		})

		socket.addEventListener('error', (event) => {
			this.emit(WSEvents.Error, event)
		})

		socket.addEventListener('message', (message) => {
			try {
				const data = JSON.parse(message.data)
				if (['pong', 'user connected'].includes(data?.type)) {
					return
				}
				this.emit(WSEvents.Message, data)
			} catch (e) {
				console.error(e)
			}
		})
	}
}
