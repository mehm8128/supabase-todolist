import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { useDeleteTask } from '@/features/task/api/deleteTask'
import { useEditTask } from '@/features/task/api/editTask'
import {
	type Task,
	type TaskEditSeed,
	taskEditSeedSchema
} from '@/features/task/model/client'
import { formatDateTime } from '@/lib/date'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getValibotConstraint, parseWithValibot } from 'conform-to-valibot'
import styles from './TaskItem.module.scss'

export default function TaskItem({ task }: { task: Task }) {
	const editTask = useEditTask()
	const [form, fields] = useForm<TaskEditSeed>({
		constraint: getValibotConstraint(taskEditSeedSchema),
		defaultValue: {
			name: task.name,
			resolved: task.resolved ? 'on' : 'off'
		},
		onValidate({ formData }) {
			const res = parseWithValibot(formData, {
				schema: taskEditSeedSchema
			})
			return res
		},
		async onSubmit(e, { submission }) {
			e.preventDefault()
			if (submission?.status !== 'success') {
				console.error('error:', submission?.error)
				return
			}
			await editTask({ id: task.id, seed: submission.value })
		}
	})

	const { mutateAsync: deleteTask } = useDeleteTask()
	const handleDelete = async () => {
		await deleteTask(task.id)
	}

	return (
		<li>
			<form {...getFormProps(form)} className={styles.wrap}>
				<input
					{...getInputProps(fields.resolved, { type: 'checkbox' })}
					className={styles.resolved}
				/>
				<Input
					{...getInputProps(fields.name, { type: 'text' })}
					checked={fields.name.value === 'on'}
				/>
				<time dateTime={formatDateTime(task.createdAt)}>
					{formatDateTime(task.createdAt)}
				</time>
				<Button type="submit" variant="secondary">
					保存
				</Button>
				<Button onClick={handleDelete} variant="error">
					削除
				</Button>
			</form>
		</li>
	)
}
