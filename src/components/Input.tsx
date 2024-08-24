import clsx from 'clsx'
import type { ComponentProps } from 'react'
import styles from './Input.module.scss'

export function Input({ ...props }: ComponentProps<'input'>) {
	return (
		<input
			type="input"
			{...props}
			className={clsx(styles.input, props.className)}
		/>
	)
}
