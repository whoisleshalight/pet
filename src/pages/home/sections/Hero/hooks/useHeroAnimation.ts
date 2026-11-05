import type { RefObject } from 'react'
import { gsap, useGSAP } from '../../../../../lib/animation'
import styles from '../Hero.module.scss'

export function useHeroAnimation(
  sectionReference: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const section = sectionReference.current

      if (!section) {
        return
      }

      const mediaQueries = gsap.matchMedia()

      mediaQueries.add('(prefers-reduced-motion: no-preference)', () => {
        const words = gsap.utils.toArray<HTMLElement>(
          `.${styles.rotatingWord}`,
          section,
        )
        const letters = section.querySelectorAll(`.${styles.brandLetter}`)
        const message = section.querySelector(`.${styles.message}`)
        const title = section.querySelector(`.${styles.title}`)

        if (words.length === 0 || !message || !title) {
          return
        }

        const wordCycle = gsap.timeline({
          repeat: -1,
          paused: true,
        })

        words.forEach((word, wordIndex) => {
          const nextWord = words[(wordIndex + 1) % words.length]
          const transitionStart = wordIndex * 2.6 + 2

          wordCycle.to(
            word,
            {
              opacity: 0,
              y: -10,
              filter: 'blur(10px)',
              duration: 0.35,
              ease: 'power2.in',
            },
            transitionStart,
          )
          wordCycle.fromTo(
            nextWord,
            { opacity: 0, y: 10, filter: 'blur(10px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.45,
              ease: 'power3.out',
              immediateRender: false,
            },
            transitionStart + 0.15,
          )
        })

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'bottom top',
            onEnter: () => wordCycle.play(),
            onEnterBack: () => wordCycle.play(),
            onLeave: () => wordCycle.pause(),
            onLeaveBack: () => wordCycle.pause(),
          },
        })
          .from([title, message], {
            y: 32,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          })

        gsap.from(letters, {
          yPercent: 100,
          opacity: 0,
          rotation: 6,
          duration: 1,
          stagger: 0.045,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section.querySelector(`.${styles.reelButton}`),
            start: 'top 90%',
            once: true,
          },
        })
      })

      return () => mediaQueries.revert()
    },
    { scope: sectionReference },
  )
}
