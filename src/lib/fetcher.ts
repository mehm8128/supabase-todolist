import { ResultAsync } from 'neverthrow'

const _fetcher = <T>(url: string, options?: RequestInit): Promise<T> =>
	fetch(url, options).then<T>(res => {
		if (!res.ok) {
			throw new Error(res.statusText)
		}
		return res.json()
	})

export const fetcher = ResultAsync.fromThrowable(_fetcher)
