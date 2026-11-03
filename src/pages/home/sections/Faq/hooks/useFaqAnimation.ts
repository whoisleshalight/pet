import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../../../../lib/animation'
import styles from '../Faq.module.scss'

export function useFaqAnimation(
  sectionReference: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const section = sectionReference.current
      const introduction = section?.querySelector<HTMLElement>(
        `.${styles.introduction}`,
      )

      if (!section || !introduction) {
        return
      }

      const mediaQueries = gsap.matchMedia()

      mediaQueries.add(
        '(min-width: 1200px) and (prefers-reduced-motion: no-preference)',
        () => {
          // A GSAP pin keeps this column fixed inside ScrollSmoother.
          ScrollTrigger.create({
            id: 'faq-introduction',
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
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
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
