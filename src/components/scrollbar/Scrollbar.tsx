import styles from './Scrollbar.module.scss'
import { useRef } from 'react'
import type { RefObject } from 'react'
import { useScrollbar } from './hooks/useScrollbar'

type ScrollbarProps = {
  contentReference: RefObject<HTMLElement | null>
  navigationKey: string
  controlsId: string
}

export function Scrollbar({
  contentReference,
  navigationKey,
  controlsId,
}: ScrollbarProps) {
  const scrollbarReference = useRef<HTMLDivElement>(null)
  const { lineCount, isScrollable, ...handlers } = useScrollbar(
    scrollbarReference,
    contentReference,
    navigationKey,
  )

  return (
    <div
      className={styles.scrollbar}
      ref={scrollbarReference}
      role="scrollbar"
      aria-label="Прокрутка сторінки"
      aria-controls={controlsId}
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      tabIndex={0}
      hidden={!isScrollable}
      {...handlers}
    >
      {Array.from({ length: lineCount }, (_, index) => (
        <span className={styles.scrollbarLine} key={index} aria-hidden="true" />
      ))}
    </div>
  )
}
