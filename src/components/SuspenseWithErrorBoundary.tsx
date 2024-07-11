import { type ReactElement, type ReactNode, Suspense } from 'react'
import { ErrorBoundary as BaseErrorBoundary } from 'react-error-boundary'

export default function SuspenseWithErrorBoundary({
	fallback = <div>loading...</div>,
	children
}: { fallback?: ReactElement; children: ReactNode }) {
	return (
		<BaseErrorBoundary fallback={<div>Something went wrong</div>}>
			<Suspense fallback={fallback}>{children}</Suspense>
		</BaseErrorBoundary>
	)
}
