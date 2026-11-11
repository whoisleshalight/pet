import { useRef } from 'react'
import { useLocation, useViewTransitionState } from 'react-router'
import { useCursorFollower } from './hooks/useCursorFollower'
import styles from './CursorFollower.module.scss'

export function CursorFollower() {
  const location = useLocation()
  const isTransitioning = useViewTransitionState(location.pathname)
  const cursorReference = useRef<HTMLDivElement>(null)
  const labelReference = useRef<HTMLSpanElement>(null)

  const isDeparting = useCursorFollower(
    cursorReference,
    labelReference,
    isTransitioning,
  )

  return (
    <div
      ref={cursorReference}
      className={styles.cursorFollower}
      data-departing={isDeparting ? '' : undefined}
      data-transitioning={isTransitioning ? '' : undefined}
      aria-hidden="true"
    >
      <span className={styles.circle} />
      <span ref={labelReference} className={styles.label} />
    </div>
  )
}
