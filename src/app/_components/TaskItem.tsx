import type { Task } from '@/features/task/model/client'
import { formatDateTime } from '@/lib/date'

export default function TaskItem({ task }: { task: Task }) {
	return (
		<li>
			<div>{task.name}</div>
			{/**TODO: 完了済みと未完でリストを分ける */}
			<div>{task.resolved ? '完了済み' : '未完'}</div>
			<time dateTime={formatDateTime(task.createdAt)}>
				{formatDateTime(task.createdAt)}
			</time>
		</li>
	)
}
