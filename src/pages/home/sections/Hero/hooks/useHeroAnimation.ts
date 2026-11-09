import type { RefObject } from 'react'
import { gsap, useGSAP } from '../../../../../lib/animation'
import styles from '../Hero.module.scss'

export function useHeroAnimation(
  heroReference: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const hero = heroReference.current

      if (!hero) {
        return
      }

      const mediaQueries = gsap.matchMedia()

      mediaQueries.add('(prefers-reduced-motion: no-preference)', () => {
        const letters = hero.querySelectorAll(`.${styles.brandLetter}`)
        const showreel = hero.querySelector(`.${styles.showreel}`)

        if (letters.length === 0 || !showreel) {
          return
        }

        gsap.from(letters, {
          yPercent: 100,
          opacity: 0,
          rotation: 6,
          duration: 1,
          stagger: 0.045,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: showreel,
            start: 'top 90%',
            once: true,
          },
        })
      })

      return () => mediaQueries.revert()
    },
    { scope: heroReference },
  )
}
