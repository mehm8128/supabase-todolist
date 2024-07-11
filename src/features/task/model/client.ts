import { parseUserId, userId } from '@/features/user/model/client'
import {
	type InferOutput,
	boolean,
	brand,
	minLength,
	number,
	object,
	pipe,
	safeParse,
	string,
	transform
} from 'valibot'

export const taskId = pipe(number(), brand('taskId'))
export type TaskId = InferOutput<typeof taskId>
export const parseTaskId = (id: number) => {
	const result = safeParse(taskId, id)
	if (!result.success) {
		throw new Error('invalid id')
	}
	return result.output
}

export const taskSchema = pipe(
	object({
		id: taskId,
		name: string(),
		resolved: boolean(),
		deadline: string(),
		createdBy: userId,
		createdAt: string(),
		updatedAt: string()
	}),
	transform(({ id, deadline, createdBy, createdAt, updatedAt, ...rest }) => ({
		id: parseTaskId(id),
		createdBy: parseUserId(createdBy),
		deadline: new Date(deadline),
		createdAt: new Date(createdAt),
		updatedAt: new Date(updatedAt),
		...rest
	}))
)

export type Task = InferOutput<typeof taskSchema>
export type TaskList = Task[]

export const taskListQuerySchema = object({
	resolved: boolean()
})
export type TaskListQuery = InferOutput<typeof taskListQuerySchema>

export const taskCreateSeedSchema = object({
	name: pipe(string(), minLength(1)),
	createdBy: userId
})
export type TaskCreateSeed = InferOutput<typeof taskCreateSeedSchema>

export const taskEditSeedSchema = object({
	id: taskId,
	name: pipe(string(), minLength(1)),
	resolved: boolean()
})
export type TaskEditSeed = InferOutput<typeof taskEditSeedSchema>
