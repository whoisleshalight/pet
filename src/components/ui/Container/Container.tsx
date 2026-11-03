import type { ReactNode } from 'react'
import styles from './Container.module.scss'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  const containerClassName = className
    ? `${styles.container} ${className}`
    : styles.container

  return <div className={containerClassName}>{children}</div>
}
