import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../../../../lib/animation'
import styles from '../Services.module.scss'

export function useServicesAnimation(
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
        {
          isDesktop: '(min-width: 1200px)',
          canPin: '(min-width: 810px) and (min-height: 600px)',
          reducedMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const conditions = context.conditions

          if (conditions?.reducedMotion) {
            return
          }

          if (conditions?.canPin) {
            // Pinning also works inside the existing ScrollSmoother transform.
            ScrollTrigger.create({
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              pin: introduction,
              pinSpacing: false,
              invalidateOnRefresh: true,
            })
          }

          if (!conditions?.isDesktop) {
            return
          }

          const title = introduction.querySelector<HTMLElement>(
            `.${styles.title}`,
          )
          const introductionCopy = introduction.querySelector<HTMLElement>(
            `.${styles.introductionCopy}`,
          )
          const contactLink = introduction.querySelector<HTMLElement>(
            `.${styles.contactLink}`,
          )

          if (title) {
            gsap.from(title.querySelectorAll(`.${styles.titleLetter}`), {
              yPercent: 115,
              duration: 0.7,
              stagger: 0.035,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: title,
                start: 'top 90%',
                once: true,
              },
            })
          }

          if (introductionCopy) {
            gsap.from(introductionCopy.querySelectorAll(`.${styles.word}`), {
              yPercent: 110,
              duration: 0.6,
              stagger: 0.025,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: introductionCopy,
                start: 'top 95%',
                once: true,
              },
            })
          }

          if (contactLink) {
            gsap.from(contactLink, {
              y: 24,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contactLink,
                start: 'top bottom',
                once: true,
              },
            })
          }

          const services = gsap.utils.toArray<HTMLElement>(
            `.${styles.service}`,
            section,
          )

          services.forEach((service) => {
            const index = service.querySelector<HTMLElement>(
              `.${styles.indexText}`,
            )
            const words = service.querySelectorAll(`.${styles.word}`)
            const capabilities = service.querySelectorAll(
              `.${styles.capability}`,
            )
            const textReveal = gsap.timeline({
              scrollTrigger: {
                trigger: service,
                start: 'top 90%',
                once: true,
              },
            })

            if (index) {
              textReveal.from(index, {
                yPercent: 110,
                duration: 0.8,
                ease: 'power3.out',
              })
            }

            textReveal.from(
              words,
              {
                yPercent: 110,
                duration: 0.6,
                stagger: 0.025,
                ease: 'power3.out',
              },
              0,
            )

            gsap.from(capabilities, {
              y: 20,
              opacity: 0,
              duration: 0.6,
              stagger: 0.06,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: service.querySelector(`.${styles.capabilities}`),
                start: 'top 95%',
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
