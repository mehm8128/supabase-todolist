'use client'

import TaskItem from '@/app/_components/TaskItem/TaskItem'
import { useTaskList } from '@/features/task/api/fetchTasks'
import styles from './TaskList.module.scss'

export default function TaskList() {
	const { data: tasks } = useTaskList()

	return (
		<div className={styles.wrap}>
			<h1>Todo List</h1>
			{tasks.length === 0 ? (
				<p>タスクはまだありません</p>
			) : (
				<ul className={styles.list}>
					{tasks.map(task => (
						<TaskItem key={task.id} task={task} />
					))}
				</ul>
			)}
		</div>
	)
}
