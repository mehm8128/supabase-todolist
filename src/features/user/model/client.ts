import {
	type InferOutput,
	brand,
	number,
	object,
	pipe,
	safeParse,
	string,
	transform
} from 'valibot'

export const userId = pipe(number(), brand('userId'))
export type UserId = InferOutput<typeof userId>
export const parseUserId = (id: number) => {
	const result = safeParse(userId, id)
	if (!result.success) {
		throw new Error('invalid id')
	}
	return result.output
}

export const userSchema = pipe(
	object({
		id: userId,
		name: string()
	}),
	transform(({ id, ...rest }) => ({
		id: parseUserId(id),
		...rest
	}))
)

export type User = InferOutput<typeof userSchema>
