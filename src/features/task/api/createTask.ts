import {
	convertTaskCreateSeedToData,
	convertTaskFromData
} from '@/features/task/converter'
import type { Task, TaskCreateSeed } from '@/features/task/model/client'
import type { TaskData } from '@/features/task/model/server'
import { getApiOrigin } from '@/lib/env'
import { fetcher } from '@/lib/fetcher'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const createTask = async (seed: TaskCreateSeed): Promise<Task> => {
	const seedData = convertTaskCreateSeedToData(seed)
	const res: TaskData = await fetcher(`${getApiOrigin()}/api/tasks`, {
		method: 'POST',
		body: JSON.stringify(seedData)
	})

	return convertTaskFromData(res)
}

export const useCreateTask = () => {
	const client = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationFn: (seed: TaskCreateSeed) => createTask(seed),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['tasks'] })
		}
	})

	return mutateAsync
}
