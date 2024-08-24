import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useDeleteTask } from '@/features/task/api/deleteTask'
import type { Task } from '@/features/task/model/client'
import { formatDateTime } from '@/lib/date'
import { useState } from 'react'
import styles from './TaskItem.module.scss'

export default function TaskItem({ task }: { task: Task }) {
	const [isEditing, setIsEditing] = useState(false)

	const { mutateAsync: deleteTask } = useDeleteTask()
	const handleEdit = () => {
		setIsEditing(!isEditing)
	}
	const handleDelete = async () => {
		await deleteTask(task.id)
	}

	return (
		<li className={styles.wrap}>
			<div className={styles.completed}>
				{task.resolved ? '完了済み' : '未完'}
			</div>
			{!isEditing ? (
				<div className={styles.name}>{task.name}</div>
			) : (
				<Input value={task.name} />
			)}
			<time className={styles.time} dateTime={formatDateTime(task.createdAt)}>
				{formatDateTime(task.createdAt)}
			</time>
			<Button onClick={handleEdit} className={styles.editButton}>
				{isEditing ? '中断' : '編集'}
			</Button>
			<Button
				onClick={handleDelete}
				variant="error"
				className={styles.deleteButton}
			>
				削除
			</Button>
		</li>
	)
}
