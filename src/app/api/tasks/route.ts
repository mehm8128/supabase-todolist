import { db } from '@/features/db'
import { tasks } from '@/features/db/schema'
import type { TaskCreateSeedData } from '@/features/task/model/server'

export async function GET() {
	const taskList = await db.query.tasks.findMany()
	// const taskList = exampleTasks

	return Response.json(taskList)
}

export async function POST(req: Request) {
	const reqBody: TaskCreateSeedData = await req.json()

	const res = (
		await db
			.insert(tasks)
			.values({
				...reqBody,
				resolved: false,
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returning()
	)[0]

	// const data = exampleTask
	return Response.json(res)
}
