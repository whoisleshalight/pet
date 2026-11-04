import type { ComponentPropsWithRef } from 'react'
import styles from './Section.module.scss'

type SectionProps = ComponentPropsWithRef<'section'>

export function Section({
  children,
  className,
  ref,
  ...sectionProps
}: SectionProps) {
  const sectionClassName = className
    ? `${styles.section} ${className}`
    : styles.section

  return (
    <section {...sectionProps} ref={ref} className={sectionClassName}>
      {children}
    </section>
  )
}
