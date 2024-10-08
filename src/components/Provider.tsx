'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import { type ReactNode, useState } from 'react'

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<JotaiProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</JotaiProvider>
	)
}
