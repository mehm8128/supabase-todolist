'use client'

import TaskItem from '@/app/_components/TaskItem'
import { useTaskList } from '@/features/task/api/fetchTasks'

export default function TaskList() {
	const { data: tasks } = useTaskList()

	return (
		<div>
			<h1>Todo List</h1>
			<ul>
				{tasks.map(task => (
					<TaskItem key={task.id} task={task} />
				))}
			</ul>
		</div>
	)
}
