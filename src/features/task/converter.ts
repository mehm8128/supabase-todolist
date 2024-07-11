import {
	type Task,
	type TaskCreateSeed,
	type TaskEditSeed,
	type TaskListQuery,
	taskSchema
} from '@/features/task/model/client'
import {
	type TaskCreateSeedData,
	type TaskData,
	type TaskEditSeedData,
	type TaskListQueryData,
	taskCreateSeedDataSchema
} from '@/features/task/model/server'
import { parse } from 'valibot'

export const convertTaskListQueryToData = (
	query?: Partial<TaskListQuery>
): TaskListQueryData => {
	return {
		resolved: query?.resolved
	}
}

export const convertTaskFromData = (data: TaskData): Task => {
	return parse(taskSchema, data)
}

export const convertTaskCreateSeedToData = (
	seed: TaskCreateSeed
): TaskCreateSeedData => {
	return parse(taskCreateSeedDataSchema, seed)
}

export const convertTaskEditSeedToData = (
	seed: TaskEditSeed
): TaskEditSeedData => {
	return {
		name: seed.name,
		resolved: seed.resolved
	}
}
