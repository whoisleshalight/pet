import type { ComponentPropsWithRef } from 'react'
import { Container } from '../Container'
import styles from './Section.module.scss'

interface SectionProps extends ComponentPropsWithRef<'section'> {
  containerClassName?: string
}

export function Section({
  children,
  className,
  containerClassName,
  ref,
  ...sectionProps
}: SectionProps) {
  const sectionClassName = className
    ? `${styles.section} ${className}`
    : styles.section

  return (
    <section {...sectionProps} ref={ref} className={sectionClassName}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
