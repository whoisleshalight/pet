import type { ComponentPropsWithRef } from 'react'
import { Link } from 'react-router'
import styles from './ArrowLink.module.scss'

type ArrowDirection = 'right' | 'upRight'

interface ArrowLinkProps extends ComponentPropsWithRef<typeof Link> {
  arrowDirection?: ArrowDirection
  arrowPosition?: 'start' | 'end'
}

const arrowPaths: Record<ArrowDirection, string> = {
  right: 'M4 12h15M12 5l7 7-7 7',
  upRight: 'M5 19 19 5M5 5h14v14',
}

export function ArrowLink({
  children,
  className,
  arrowDirection = 'right',
  arrowPosition = 'start',
  ...linkProps
}: ArrowLinkProps) {
  const linkClassName = className
    ? `${styles.link} ${className}`
    : styles.link
  const arrowClassName = arrowDirection === 'right'
    ? `${styles.arrow} ${styles.right}`
    : styles.arrow
  const arrow = (
    <span className={styles.arrowViewport} aria-hidden="true">
      <svg
        className={arrowClassName}
        viewBox="0 0 24 24"
        fill="none"
        focusable="false"
      >
        <path
          d={arrowPaths[arrowDirection]}
          stroke="currentColor"
          strokeWidth={arrowDirection === 'right' ? 1.8 : 1.5}
        />
      </svg>
    </span>
  )

  return (
    <Link viewTransition {...linkProps} className={linkClassName}>
      {arrowPosition === 'start' && arrow}
      <span>{children}</span>
      {arrowPosition === 'end' && arrow}
    </Link>
  )
}
