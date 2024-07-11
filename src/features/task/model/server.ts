import { tasks } from '@/features/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'
import {
	type InferOutput,
	boolean,
	object,
	optional,
	pick,
	string
} from 'valibot'

export const taskDataSchema = createSelectSchema(tasks, {
	createdAt: string(),
	updatedAt: string()
})
export type TaskData = InferOutput<typeof taskDataSchema>
export type TaskListData = TaskData[]

export const taskListQueryDataSchema = object({
	resolved: optional(boolean())
})
export type TaskListQueryData = InferOutput<typeof taskListQueryDataSchema>

export const taskCreateSeedDataSchema = pick(createInsertSchema(tasks), [
	'name',
	'createdBy'
])
export type TaskCreateSeedData = InferOutput<typeof taskCreateSeedDataSchema>

export const taskEditSeedDataSchema = pick(createInsertSchema(tasks), ['name'])
export type TaskEditSeedData = InferOutput<typeof taskEditSeedDataSchema>
