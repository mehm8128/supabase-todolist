import { users } from '@/features/db/schema'
import { createSelectSchema } from 'drizzle-valibot'
import type { InferOutput } from 'valibot'

export const userDataSchema = createSelectSchema(users)
export type UserData = InferOutput<typeof userDataSchema>
