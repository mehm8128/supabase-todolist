import { type Task, parseTaskId } from '@/features/task/model/client'

export const exampleTask: Task = {
	id: parseTaskId(1),
	name: 'todolistの作成',
	resolved: false,
	createdAt: new Date('2021-01-03T00:00:00.000Z'),
	updatedAt: new Date('2021-01-03T00:00:00.000Z')
}

export const exampleTasks: Task[] = [
	exampleTask,
	{
		...exampleTask,
		id: parseTaskId(2)
	},
	{
		...exampleTask,
		id: parseTaskId(3)
	}
]
