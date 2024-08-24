import {
	convertTaskEditSeedToData,
	convertTaskFromData
} from '@/features/task/converter'
import type { Task, TaskEditSeed, TaskId } from '@/features/task/model/client'
import type { TaskData } from '@/features/task/model/server'
import { getApiOrigin } from '@/lib/env'
import { fetcher } from '@/lib/fetcher'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const editTask = async (id: TaskId, seed: TaskEditSeed): Promise<Task> => {
	const seedData = convertTaskEditSeedToData(seed)
	const res: TaskData = await fetcher(`${getApiOrigin()}/api/tasks/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(seedData)
	})

	return convertTaskFromData(res)
}

export const useEditTask = () => {
	const client = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationFn: ({ id, seed }: { id: TaskId; seed: TaskEditSeed }) =>
			editTask(id, seed),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['tasks'] })
		}
	})

	return mutateAsync
}
