export function checkForNull(
	...values: (string | null | undefined)[]
): boolean {
	return values.some((value) => value == null)
}

export type Indexed<T = unknown> = {
	[key in string]: T
}

export function sanitizeInput(input: string): string {
	return input.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function formatDateTime(inputDate: string): string {
	const dateObj = new Date(inputDate)

	const hours = dateObj.getHours().toString().padStart(2, '0')
	const minutes = dateObj.getMinutes().toString().padStart(2, '0')

	return `${hours}:${minutes}`
}

export function set(
	object: Indexed | unknown,
	path: string,
	value: unknown
): Indexed | unknown {
	if (typeof object !== 'object' || object === null) {
		return object
	}

	const result = path.split('.').reduceRight<Indexed>(
		(acc, key) => ({
			[key]: acc
		}),
		value as any
	)
	return merge(object as Indexed, result)
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
	for (const p in rhs) {
		if (!rhs.hasOwnProperty(p)) {
			continue
		}

		try {
			if (rhs[p] && typeof rhs[p] === 'object' && !Array.isArray(rhs[p])) {
				lhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed)
			} else {
				lhs[p] = rhs[p]
			}
		} catch (e) {
			lhs[p] = rhs[p]
		}
	}

	return lhs
}

export function cloneDeep<T extends object>(obj: T): T {
	const _cloneDeep = (item: any): any => {
		if (item === null || typeof item !== 'object') {
			return item
		}

		if (item instanceof Date) {
			return new Date(item.valueOf())
		}

		if (item instanceof Array) {
			let copy: any[] = []

			item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])))

			return copy
		}

		if (item instanceof Set) {
			let copy = new Set()

			item.forEach((v: any) => copy.add(_cloneDeep(v)))

			return copy
		}

		if (item instanceof Map) {
			let copy = new Map()

			item.forEach((v, k) => copy.set(k, _cloneDeep(v)))

			return copy
		}

		if (item instanceof Object) {
			let copy: { [key: string]: any } = {}

			Object.getOwnPropertySymbols(item).forEach(
				(s) => (copy[s.toString()] = _cloneDeep(item[s]))
			)
			Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])))

			return copy
		}

		throw new Error(`Unable to copy object: ${item}`)
	}

	return _cloneDeep(obj)
}

export default cloneDeep
