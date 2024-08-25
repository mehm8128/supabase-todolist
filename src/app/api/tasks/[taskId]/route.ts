import { db } from '@/features/db'
import { tasks } from '@/features/db/schema'
import type { TaskEditSeedData } from '@/features/task/model/server'
import { eq } from 'drizzle-orm'

export async function PATCH(
	req: Request,
	{ params: { taskId } }: { params: { taskId: string } }
) {
	const reqBody: TaskEditSeedData = await req.json()

	const res = (
		await db
			.update(tasks)
			.set({
				...reqBody,
				updatedAt: new Date()
			})
			.where(eq(tasks.id, Number(taskId)))
			.returning()
	)[0]

	// const data = exampleTask
	return Response.json(res)
}

export async function DELETE(
	_: Request,
	{ params: { taskId } }: { params: { taskId: string } }
) {
	await db.delete(tasks).where(eq(tasks.id, Number(taskId)))

	return Response.json({ message: 'ok' })
}
