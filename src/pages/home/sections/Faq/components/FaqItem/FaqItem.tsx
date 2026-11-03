import { useId, useRef, useSyncExternalStore } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../../../../../lib/animation'
import type { FaqItemData } from '../../faqItems'
import styles from './FaqItem.module.scss'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function subscribeToMotionPreference(onChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery)
  mediaQuery.addEventListener('change', onChange)

  return () => mediaQuery.removeEventListener('change', onChange)
}

function getReducedMotionPreference() {
  return window.matchMedia(reducedMotionQuery).matches
}

interface FaqItemProps {
  item: FaqItemData
  isExpanded: boolean
  onToggle: () => void
}

export function FaqItem({ item, isExpanded, onToggle }: FaqItemProps) {
  const itemReference = useRef<HTMLDivElement>(null)
  const answerReference = useRef<HTMLDivElement>(null)
  const isInitialRender = useRef(true)
  const itemId = useId()
  const questionId = `${itemId}-question`
  const answerId = `${itemId}-answer`
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotionPreference,
    () => true,
  )

  useGSAP(
    () => {
      const answer = answerReference.current

      if (!answer) {
        return
      }

      const animation = {
        height: isExpanded ? 'auto' : 0,
        opacity: isExpanded ? 1 : 0,
      }

      if (isInitialRender.current) {
        gsap.set(answer, animation)
        isInitialRender.current = false
        return
      }

      gsap.to(answer, {
        ...animation,
        duration: reducedMotion ? 0 : 0.45,
        ease: 'power2.inOut',
        overwrite: 'auto',
        // Accordion changes affect the pin and the following footer position.
        onComplete: () => ScrollTrigger.refresh(),
      })
    },
    { scope: itemReference, dependencies: [isExpanded, reducedMotion] },
  )

  return (
    <div ref={itemReference} className={styles.item}>
      <h3 className={styles.heading}>
        <button
          id={questionId}
          type="button"
          className={styles.trigger}
          aria-expanded={isExpanded}
          aria-controls={answerId}
          onClick={onToggle}
        >
          <span className={styles.icon} aria-hidden="true" />
          <span className={styles.question}>{item.question}</span>
        </button>
      </h3>

      <div
        ref={answerReference}
        id={answerId}
        className={styles.answer}
        role="region"
        aria-labelledby={questionId}
        aria-hidden={!isExpanded}
        inert={!isExpanded}
      >
        <p className={styles.answerText}>{item.answer}</p>
      </div>
    </div>
  )
}
