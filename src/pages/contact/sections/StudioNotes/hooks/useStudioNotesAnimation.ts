import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../../../../lib/animation'
import styles from '../StudioNotes.module.scss'

export function useStudioNotesAnimation(
  sectionReference: RefObject<HTMLElement | null>,
  introductionReference: RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      const section = sectionReference.current
      const introduction = introductionReference.current

      if (!section || !introduction) {
        return
      }

      const mediaQueries = gsap.matchMedia()

      mediaQueries.add(
        '(min-width: 1200px) and (prefers-reduced-motion: no-preference)',
        () => {
          // ScrollSmoother transforms the page, so pin this column through GSAP.
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            pin: introduction,
            pinSpacing: false,
            invalidateOnRefresh: true,
          })

          gsap.from(section.querySelector(`.${styles.title}`), {
            y: 32,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section.querySelector(`.${styles.title}`),
              start: 'top 90%',
              once: true,
            },
          })
        },
        section,
      )

      return () => mediaQueries.revert()
    },
    { scope: sectionReference },
  )
}
