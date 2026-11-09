import type { ComponentPropsWithRef } from 'react'
import styles from './Container.module.scss'

type ContainerProps = ComponentPropsWithRef<'div'>

export function Container({
  children,
  className,
  ref,
  ...containerProps
}: ContainerProps) {
  const containerClassName = className
    ? `${styles.container} ${className}`
    : styles.container

  return (
    <div {...containerProps} ref={ref} className={containerClassName}>
      {children}
    </div>
  )
}
