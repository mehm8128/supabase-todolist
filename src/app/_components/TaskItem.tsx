import { useDeleteTask } from '@/features/task/api/deleteTask'
import type { Task } from '@/features/task/model/client'
import { formatDateTime } from '@/lib/date'
import { useState } from 'react'

export default function TaskItem({ task }: { task: Task }) {
	const [isEditing, setIsEditing] = useState(false)

	const { mutateAsync: deleteTask } = useDeleteTask()
	const handleEdit = () => {
		setIsEditing(true)
	}
	const handleDelete = async () => {
		await deleteTask(task.id)
	}

	return (
		<li>
			<div>{task.name}</div>
			{/**TODO: 完了済みと未完でリストを分ける */}
			<div>{task.resolved ? '完了済み' : '未完'}</div>
			<time dateTime={formatDateTime(task.createdAt)}>
				{formatDateTime(task.createdAt)}
			</time>
			<button onClick={handleEdit} type="button">
				編集
			</button>
			<button onClick={handleDelete} type="button">
				削除
			</button>
		</li>
	)
}
