import { Providers } from '@/components/Provider'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'TodoList',
	description: 'TodoList'
}

export default function RootLayout({
	children
}: {
	children: ReactNode
}) {
	return (
		<html lang="ja">
			<Providers>
				<body className={inter.className}>
					<main>{children}</main>
				</body>
			</Providers>
		</html>
	)
}
