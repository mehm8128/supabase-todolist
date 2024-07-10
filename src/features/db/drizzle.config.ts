import type { Config } from 'drizzle-kit'

const drizzleConfig = {
	schema: './src/features/db/schema.ts',
	out: './src/features/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL ?? ''
	}
} satisfies Config

export default drizzleConfig
