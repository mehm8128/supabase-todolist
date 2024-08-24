'use client'

import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { useCreateTask } from '@/features/task/api/createTask'
import {
	type TaskCreateSeed,
	taskCreateSeedSchema
} from '@/features/task/model/client'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getValibotConstraint, parseWithValibot } from 'conform-to-valibot'
import styles from './Form.module.scss'

export default function Form() {
	const createTask = useCreateTask()
	const [form, fields] = useForm<TaskCreateSeed>({
		constraint: getValibotConstraint(taskCreateSeedSchema),
		defaultValue: {
			name: ''
		},
		onValidate({ formData }) {
			const res = parseWithValibot(formData, {
				schema: taskCreateSeedSchema
			})
			return res
		},
		async onSubmit(e, { submission }) {
			e.preventDefault()
			if (submission?.status !== 'success') {
				console.error('error:', submission?.error)
				return
			}
			await createTask(submission.value)
		}
	})

	return (
		<form {...getFormProps(form)} className={styles.form}>
			<div className={styles.fieldWrap}>
				<label className={styles.label}>
					名前
					<Input {...getInputProps(fields.name, { type: 'text' })} />
				</label>
				{fields.name.errors && (
					<div id={fields.name.errorId} className={styles.error}>
						{fields.name.errors}
					</div>
				)}
			</div>
			<Button type="submit" className={styles.addButton} variant="primary">
				追加
			</Button>
		</form>
	)
}
