import { exampleTask } from '@/features/task/fixture'
import type { TaskEditSeedData } from '@/features/task/model/server'

export async function PATCH(
	req: Request,
	{ params: { taskId } }: { params: { taskId: string } }
) {
	const reqBody: TaskEditSeedData = await req.json()

	// await db
	// 	.update(tasks)
	// 	.set({
	// 		...reqBody,
	// 		updatedAt: new Date()
	// 	})
	// 	.where(eq(tasks.id, Number(taskId)))

	const data = exampleTask
	return Response.json(data)
}

export async function DELETE(
	_: Request,
	{ params: { taskId } }: { params: { taskId: string } }
) {
	// await db.delete(tasks).where(eq(tasks.id, Number(taskId)))

	return Response.json({ message: 'ok' })
}
