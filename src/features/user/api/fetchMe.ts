import { convertUserFromData } from '@/features/user/converter'
import type { User } from '@/features/user/model/client'
import type { UserData } from '@/features/user/model/server'
import { getApiOrigin } from '@/lib/env'
import { fetcher } from '@/lib/fetcher'
import { useSuspenseQuery } from '@tanstack/react-query'

const fetchMe = async (): Promise<User> => {
	const res: UserData = await fetcher(`${getApiOrigin()}/api/users/me`)

	return convertUserFromData(res)
}

export const useMe = () => {
	return useSuspenseQuery({
		queryKey: ['users', 'me'],
		queryFn: fetchMe
	})
}
