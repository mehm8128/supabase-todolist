import {
	convertTaskEditSeedToData,
	convertTaskFromData
} from '@/features/task/converter'
import type { Task, TaskEditSeed } from '@/features/task/model/client'
import type { TaskData } from '@/features/task/model/server'
import { getApiOrigin } from '@/lib/env'
import { fetcher } from '@/lib/fetcher'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const editTask = async (seed: TaskEditSeed): Promise<Task> => {
	const seedData = convertTaskEditSeedToData(seed)
	const res: TaskData = await fetcher(
		`${getApiOrigin()}/api/tasks/${seed.id}`,
		{
			method: 'PATCH',
			body: JSON.stringify(seedData)
		}
	)

	return convertTaskFromData(res)
}

export const useEditTask = () => {
	const client = useQueryClient()

	const mutation = useMutation({
		mutationFn: (seed: TaskEditSeed) => editTask(seed),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['tasks'] })
		}
	})

	return mutation
}
