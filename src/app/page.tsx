import SuspenseWithErrorBoundary from '@/components/SuspenseWithErrorBoundary'
import Form from './_components/Form'
import TaskList from './_components/TaskList'
import styles from './page.module.scss'

export default function Page() {
	return (
		<div className={styles.wrap}>
			<Form />
			<SuspenseWithErrorBoundary>
				<TaskList />
			</SuspenseWithErrorBoundary>
		</div>
	)
}
