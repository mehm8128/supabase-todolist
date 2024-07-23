import { db } from '@/features/db'
import { tasks } from '@/features/db/schema'
import { exampleTask } from '@/features/task/fixture'
import type { TaskEditSeedData } from '@/features/task/model/server'
import { eq } from 'drizzle-orm'

export async function GET(
	_: Request,
	{ params: { taskId } }: { params: { taskId: string } }
) {
	const task = await db.query.tasks.findFirst({
		where: (tasks, { eq }) => eq(tasks.id, Number(taskId))
	})

	const data = exampleTask
	return Response.json(data)
}

export async function PATCH(
	req: Request,
	{ params: { taskId } }: { params: { taskId: string } }
) {
	const reqBody: TaskEditSeedData = await req.json()

	await db
		.update(tasks)
		.set({
			...reqBody,
			updatedAt: new Date()
		})
		.where(eq(tasks.id, Number(taskId)))

	const data = exampleTask
	return Response.json(data)
}

export async function DELETE(
	_: Request,
	{ params: { taskId } }: { params: { taskId: string } }
) {
	await db.delete(tasks).where(eq(tasks.id, Number(taskId)))

	return Response.json({ message: 'ok' })
}
