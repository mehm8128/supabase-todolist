import {
	boolean,
	pgTable,
	serial,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core'

export const tasks = pgTable('tasks', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 64 }).notNull(),
	resolved: boolean('resolved').notNull(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
})
