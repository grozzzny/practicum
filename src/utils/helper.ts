export function checkForNull(
	...values: (string | null | undefined)[]
): boolean {
	return values.some((value) => value == null)
}

export type Indexed<T = unknown> = {
	[key in string]: T
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
