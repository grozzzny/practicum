enum Methods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATH = 'PATH',
	DELETE = 'DELETE'
}

type RequestOptions = {
	headers?: Record<string, string>
	method?: string
	data?: Record<string, any>
	timeout?: number
	withCredentials?: boolean | undefined
	responseType?: XMLHttpRequestResponseType
}

export class ErrorAPI extends Error {
	reason: string

	constructor(reason: string) {
		super('API error')
		this.name = 'ErrorAPI'
		this.reason = reason
	}
}

export type ErrorAPIType = {
	status?: number
	reason: string
}

function queryStringify(data?: Record<string, any>): string {
	if (typeof data !== 'object') return ''
	const keys = Object.keys(data)
	return keys.reduce(
		(result, key, index) =>
			`${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
		'?'
	)
}

export class HTTPTransport {
	constructor(private readonly urlApi = '') {}

	public get<Response = unknown>(url: string, options: RequestOptions = {}) {
		const { data, ...restOptions } = options
		return this.request<Response>(
			`${url}${queryStringify(data)}`,
			Methods.GET,
			restOptions
		)
	}

	public put<Response = unknown>(url: string, options: RequestOptions = {}) {
		return this.request<Response>(url, Methods.PUT, options)
	}

	public post<Response = unknown>(url: string, options: RequestOptions = {}) {
		return this.request<Response>(url, Methods.POST, options)
	}

	public path<Response = unknown>(url: string, options: RequestOptions = {}) {
		return this.request<Response>(url, Methods.PATH, options)
	}

	public delete<Response = unknown>(url: string, options: RequestOptions = {}) {
		return this.request<Response>(url, Methods.DELETE, options)
	}

	private request<Response extends XMLHttpRequest | unknown>(
		url: string,
		method: Methods,
		options: RequestOptions = {}
	): Promise<Response> {
		const {
			data,
			headers,
			timeout = 60000,
			withCredentials = true,
			responseType = 'json'
		} = options

		return new Promise((resolve, reject: (error: ErrorAPIType) => void) => {
			const xhr = new XMLHttpRequest()
			xhr.open(method, `${this.urlApi}${url}`)

			xhr.onload = () => {
				const status = xhr.status || 0
				if (status >= 200 && status < 300) {
					resolve(xhr.response)
				} else {
					const message = {
						0: 'abort',
						100: 'Information',
						200: 'Ok',
						300: 'Redirect failed',
						400: 'Access error',
						500: 'Internal server error'
					}[Math.floor(status / 100) * 100]
					reject({ status, reason: xhr.response?.reason || message })
				}
			}
			xhr.onabort = () => reject({ reason: 'abort' })
			xhr.onerror = () => reject({ reason: 'network error' })
			xhr.ontimeout = () => reject({ reason: 'timeout' })

			Object.entries(headers ?? {}).forEach(([key, value]) => {
				xhr.setRequestHeader(key, value)
			})

			xhr.timeout = timeout
			xhr.withCredentials = withCredentials
			xhr.responseType = responseType

			if (method === Methods.GET || !data) {
				xhr.send()
			} else if (data instanceof FormData) {
				xhr.send(data)
			} else {
				xhr.setRequestHeader('Content-Type', 'application/json')
				xhr.send(JSON.stringify(data))
			}
		})
	}
}
