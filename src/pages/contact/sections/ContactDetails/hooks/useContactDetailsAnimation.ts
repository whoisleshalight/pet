import type { RefObject } from 'react'
import { gsap, useGSAP } from '../../../../../lib/animation'
import styles from '../ContactDetails.module.scss'

export function useContactDetailsAnimation(
  sectionReference: RefObject<HTMLElement | null>,
  imageReference: RefObject<HTMLImageElement | null>,
  cardReference: RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      const section = sectionReference.current
      const image = imageReference.current
      const card = cardReference.current

      if (!section || !image || !card) {
        return
      }

      const mediaQueries = gsap.matchMedia()

      mediaQueries.add(
        '(min-width: 1200px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.fromTo(
            image,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: 'none',
              scrollTrigger: {
                trigger: image.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          )

          gsap.from(card.querySelectorAll(`.${styles.contactGroup}`), {
            y: 24,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
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
