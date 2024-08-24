import SuspenseWithErrorBoundary from '@/components/SuspenseWithErrorBoundary'
import Form from './_components/Form'
import TaskList from './_components/TaskList'

export default function Page() {
	return (
		<div>
			<Form />
			<SuspenseWithErrorBoundary>
				<TaskList />
			</SuspenseWithErrorBoundary>
		</div>
	)
}
