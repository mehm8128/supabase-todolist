import {
	boolean,
	char,
	pgTable,
	serial,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 64 }).notNull()
})

export const tasks = pgTable('tasks', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 64 }).notNull(),
	resolved: boolean('resolved').notNull(),
	deadline: timestamp('deadline'),
	createdBy: char('created_by')
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
})
