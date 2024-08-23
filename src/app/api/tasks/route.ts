import { db } from '@/features/db'
import { tasks } from '@/features/db/schema'
import { exampleTask, exampleTasks } from '@/features/task/fixture'
import type { TaskCreateSeedData } from '@/features/task/model/server'

export async function GET() {
	const taskList = await db.query.tasks.findMany()

	const data = exampleTasks
	return Response.json(data)
}

export async function POST(req: Request) {
	const reqBody: TaskCreateSeedData = await req.json()

	await db.insert(tasks).values({
		...reqBody,
		resolved: false,
		createdAt: new Date(),
		updatedAt: new Date()
	})

	const data = exampleTask
	return Response.json(data)
}
