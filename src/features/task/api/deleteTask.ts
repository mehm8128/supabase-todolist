import type { TaskId } from '@/features/task/model/client'
import { getApiOrigin } from '@/lib/env'
import { fetcher } from '@/lib/fetcher'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteTask = async (taskId: TaskId): Promise<void> => {
	await fetcher(`${getApiOrigin()}/api/tasks/${taskId}`, {
		method: 'DELETE'
	})
}

export const useDeleteTask = () => {
	const client = useQueryClient()

	const mutation = useMutation({
		mutationFn: (taskId: TaskId) => deleteTask(taskId),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['tasks'] })
		}
	})

	return mutation
}
