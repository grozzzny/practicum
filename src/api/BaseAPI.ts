import { HTTPTransport } from '../utils/HTTPTransport'

const URL_API = 'https://ya-praktikum.tech/api/v2'

// @see https://ya-praktikum.tech/api/v2/swagger
export abstract class BaseAPI {
	private readonly urlApi: string
	private httpTransport?: HTTPTransport

	constructor(path: string) {
		this.urlApi = `${URL_API}${path}`
	}

	protected transport() {
		if (!this.httpTransport) {
			this.httpTransport = new HTTPTransport(this.urlApi)
		}

		return this.httpTransport
	}
}
