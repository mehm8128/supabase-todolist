import { convertTaskFromData } from '@/features/task/converter'
import type { Task, TaskId } from '@/features/task/model/client'
import type { TaskData } from '@/features/task/model/server'
import { getApiOrigin } from '@/lib/env'
import { fetcher } from '@/lib/fetcher'
import { useSuspenseQuery } from '@tanstack/react-query'

const fetchTask = async (id: TaskId): Promise<Task> => {
	const res: TaskData = await fetcher(`${getApiOrigin()}/api/tasks/${id}`)

	return convertTaskFromData(res)
}

export const useTask = (id: TaskId) => {
	return useSuspenseQuery({
		queryKey: ['tasks', id],
		queryFn: () => fetchTask(id)
	})
}
