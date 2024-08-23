'use client'

import { useCreateTask } from '@/features/task/api/createTask'
import {
	type TaskCreateSeed,
	taskCreateSeedSchema
} from '@/features/task/model/client'
import { parseUserId } from '@/features/user/model/client'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getValibotConstraint, parseWithValibot } from 'conform-to-valibot'

export default function Page() {
	const createTask = useCreateTask()
	const [form, fields] = useForm<TaskCreateSeed>({
		constraint: getValibotConstraint(taskCreateSeedSchema),
		defaultValue: {
			name: '',
			createdBy: parseUserId(1)
		},
		onValidate({ formData }) {
			const res = parseWithValibot(formData, {
				schema: taskCreateSeedSchema
			})
			return res
		},
		onSubmit(e, { submission }) {
			e.preventDefault()
			if (submission?.status !== 'success') {
				console.error('error:', submission?.error)
				return
			}
			createTask(submission.value)
		}
	})

	return (
		<div>
			<form {...getFormProps(form)}>
				<div>
					<label>
						名前
						<input {...getInputProps(fields.name, { type: 'text' })} />
					</label>
					<div id={fields.name.errorId}>{fields.name.errors}</div>
				</div>
				<input {...getInputProps(fields.createdBy, { type: 'hidden' })} />
				<button type="submit">追加</button>
			</form>
		</div>
	)
}
