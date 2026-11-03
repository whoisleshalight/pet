import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../../../../lib/animation'
import styles from '../Partners.module.scss'

export function usePartnersAnimation(
  sectionReference: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const section = sectionReference.current

      if (!section) {
        return
      }

      const introduction = section.querySelector<HTMLElement>(
        `.${styles.introduction}`,
      )
      const title = section.querySelector<HTMLElement>(`.${styles.title}`)
      const logoStage = section.querySelector<HTMLElement>(`.${styles.logoStage}`)
      const imageFrame = section.querySelector<HTMLElement>(`.${styles.imageFrame}`)
      const teamImage = section.querySelector<HTMLImageElement>(
        `.${styles.teamImage}`,
      )

      if (!introduction || !title || !logoStage || !imageFrame || !teamImage) {
        return
      }

      const mediaQueries = gsap.matchMedia()

      mediaQueries.add(
        '(min-width: 1200px) and (prefers-reduced-motion: no-preference)',
        () => {
          // ScrollTrigger pins also work inside the existing ScrollSmoother transform.
          // The Grid supplies the scroll space, so neither pin adds its own spacing.
          ScrollTrigger.create({
            trigger: introduction,
            start: 'top top',
            endTrigger: imageFrame,
            end: 'bottom bottom',
            pin: introduction,
            pinSpacing: false,
            invalidateOnRefresh: true,
          })

          ScrollTrigger.create({
            trigger: logoStage,
            start: 'top top',
            endTrigger: imageFrame,
            end: 'bottom bottom',
            pin: logoStage,
            pinSpacing: false,
            invalidateOnRefresh: true,
          })

          gsap.fromTo(
            title,
            { opacity: 1 },
            {
              opacity: 0.02,
              ease: 'none',
              scrollTrigger: {
                trigger: logoStage,
                start: 'top bottom',
                end: 'top 30%',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          )

          gsap.set(teamImage, { height: 'calc(100% + 300px)' })
          gsap.fromTo(
            teamImage,
            { y: 0 },
            {
              y: -300,
              ease: 'none',
              scrollTrigger: {
                trigger: imageFrame,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          )
        },
        section,
      )

      mediaQueries.add(
        '(min-width: 1200px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const logoCells = gsap.utils.toArray<HTMLElement>(
            `.${styles.logoCell}`,
            section,
          )

          const removeListeners: Array<() => void> = []

          logoCells.forEach((cell) => {
            const image = cell.querySelector<HTMLImageElement>(`.${styles.logo}`)

            if (!image) {
              return
            }

            const scaleXTo = gsap.quickTo(image, 'scaleX', {
              duration: 0.5,
              ease: 'power3.out',
            })
            const scaleYTo = gsap.quickTo(image, 'scaleY', {
              duration: 0.5,
              ease: 'power3.out',
            })

            function handlePointerMove(event: PointerEvent) {
              const bounds = cell.getBoundingClientRect()
              const horizontalDistance = event.clientX - bounds.left - bounds.width / 2
              const verticalDistance = event.clientY - bounds.top - bounds.height / 2
              const distance = Math.hypot(horizontalDistance, verticalDistance)
              const radius = Math.hypot(bounds.width, bounds.height) / 2
              const proximity = 1 - Math.min(distance / radius, 1)

              const scale = 1 + proximity * 0.65

              scaleXTo(scale)
              scaleYTo(scale)
            }

            function handlePointerLeave() {
              scaleXTo(1)
              scaleYTo(1)
            }

            cell.addEventListener('pointermove', handlePointerMove)
            cell.addEventListener('pointerleave', handlePointerLeave)

            removeListeners.push(() => {
              cell.removeEventListener('pointermove', handlePointerMove)
              cell.removeEventListener('pointerleave', handlePointerLeave)
            })
          })

          return () => {
            removeListeners.forEach((removeListener) => removeListener())
          }
        },
        section,
      )

      return () => mediaQueries.revert()
    },
    { scope: sectionReference },
  )
}
