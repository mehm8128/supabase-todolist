import clsx from 'clsx'
import type { ComponentProps, ReactNode } from 'react'
import styles from './Button.module.scss'

type Variant = 'primary' | 'secondary' | 'error'

export function Button({
	children,
	variant = 'secondary',
	...props
}: { children: ReactNode; variant?: Variant } & ComponentProps<'button'>) {
	return (
		<button
			type="button"
			{...props}
			className={clsx(styles.button, props.className, styles[variant])}
		>
			{children}
		</button>
	)
}
