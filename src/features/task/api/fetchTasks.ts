import { convertTaskFromData } from '@/features/task/converter'
import type { TaskList, TaskListQuery } from '@/features/task/model/client'
import type { TaskListData } from '@/features/task/model/server'
import { getApiOrigin } from '@/lib/env'
import { fetcher } from '@/lib/fetcher'
import { useSuspenseQuery } from '@tanstack/react-query'

export const fetchTaskList = async (
	query?: Partial<TaskListQuery>
): Promise<TaskList> => {
	const queryParams = new URLSearchParams()
	for (const q in query) {
		const value = query[q as keyof typeof query]
		if (value !== undefined) {
			queryParams.append(q, value.toString())
		}
	}
	const res: TaskListData = await fetcher(
		`${getApiOrigin()}/api/tasks?${queryParams}`,
		{ cache: 'no-store' }
	)

	return res.map(convertTaskFromData)
}

export const useTaskList = (query?: Partial<TaskListQuery>) => {
	return useSuspenseQuery({
		queryKey: ['tasks', query],
		queryFn: () => fetchTaskList(query)
	})
}
