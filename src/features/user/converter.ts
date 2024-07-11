import { type User, userSchema } from '@/features/user/model/client'
import type { UserData } from '@/features/user/model/server'
import { parse } from 'valibot'

export const convertUserFromData = (data: UserData): User => {
	return parse(userSchema, data)
}
