import type { RefObject } from 'react'
import { gsap, useGSAP } from '../../../../../lib/animation'
import styles from '../Process.module.scss'

export function useProcessAnimation(
  sectionReference: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const section = sectionReference.current

      if (!section) {
        return
      }

      const mediaQueries = gsap.matchMedia()

      mediaQueries.add(
        '(min-width: 1200px) and (prefers-reduced-motion: no-preference)',
        () => {
          const select = gsap.utils.selector(section)
          const title = section.querySelector<HTMLElement>(`.${styles.title}`)
          const introduction = section.querySelector<HTMLElement>(
            `.${styles.introductionCopy}`,
          )
          const bars = gsap.utils.toArray<HTMLElement>(`.${styles.bar}`, section)
          const steps = gsap.utils.toArray<HTMLElement>(`.${styles.step}`, section)

          if (!title || !introduction) {
            return
          }

          gsap.from(select(`.${styles.titleLetter}`), {
            yPercent: 115,
            duration: 0.8,
            stagger: 0.035,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 90%',
              once: true,
            },
          })

          gsap.from(introduction.querySelectorAll(`.${styles.word}`), {
            yPercent: 110,
            duration: 0.6,
            stagger: 0.025,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: introduction,
              start: 'top 90%',
              once: true,
            },
          })

          bars.forEach((bar) => {
            const fill = bar.querySelector<HTMLElement>(`.${styles.barFill}`)
            const words = bar.querySelectorAll(`.${styles.word}`)

            const reveal = gsap.timeline({
              scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
                once: true,
              },
            })

            if (fill) {
              reveal.from(fill, {
                scaleX: 0,
                transformOrigin: 'left center',
                duration: 0.9,
                ease: 'power3.inOut',
              })
            }

            reveal.from(
              words,
              {
                yPercent: 110,
                duration: 0.6,
                stagger: 0.04,
                ease: 'power3.out',
              },
              0.3,
            )
          })

          steps.forEach((step) => {
            gsap.from(step.querySelectorAll(`.${styles.word}`), {
              yPercent: 110,
              duration: 0.6,
              stagger: 0.018,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 92%',
                once: true,
              },
            })
          })
        },
        section,
      )

      return () => mediaQueries.revert()
    },
    { scope: sectionReference },
  )
}
