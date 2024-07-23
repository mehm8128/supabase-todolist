import { db } from '@/features/db'
import { exampleUser } from '@/features/user/fixture'

export async function GET(_: Request) {
	const userId = 1
	const user = await db.query.tasks.findFirst({
		where: (users, { eq }) => eq(users.id, userId)
	})

	const data = exampleUser
	return Response.json(data)
}
