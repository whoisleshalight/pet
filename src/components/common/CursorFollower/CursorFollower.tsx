import { useRef } from 'react'
import { useCursorFollower } from './hooks/useCursorFollower'
import styles from './CursorFollower.module.scss'

export function CursorFollower() {
  const cursorReference = useRef<HTMLDivElement>(null)
  const labelReference = useRef<HTMLSpanElement>(null)

  useCursorFollower(cursorReference, labelReference)

  return (
    <div ref={cursorReference} className={styles.cursorFollower} aria-hidden="true">
      <span className={styles.circle} />
      <span ref={labelReference} className={styles.label} />
    </div>
  )
}
