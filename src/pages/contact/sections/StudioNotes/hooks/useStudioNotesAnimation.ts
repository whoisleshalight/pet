import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../../../../lib/animation'
import styles from '../StudioNotes.module.scss'

interface StudioNotesAnimationOptions {
  sectionReference: RefObject<HTMLElement | null>
  sidebarReference: RefObject<HTMLDivElement | null>
  introductionReference: RefObject<HTMLDivElement | null>
}

export function useStudioNotesAnimation({
  sectionReference,
  sidebarReference,
  introductionReference,
}: StudioNotesAnimationOptions) {
  useGSAP(
    () => {
      const section = sectionReference.current
      const sidebar = sidebarReference.current
      const introduction = introductionReference.current
      const title = section?.querySelector<HTMLElement>(`.${styles.title}`)

      if (!section || !sidebar || !introduction || !title) {
        return
      }

      const mediaQueries = gsap.matchMedia()

      mediaQueries.add(
        '(min-width: 1200px) and (prefers-reduced-motion: no-preference)',
        () => {
          // Keep the column in normal flow and pin only its compact content.
          const sidebarPin = ScrollTrigger.create({
            id: 'studio-notes-sidebar',
            trigger: introduction,
            start: () => {
              const bottomOffset = parseFloat(
                getComputedStyle(section).paddingBlockEnd,
              )

              return `bottom bottom-=${bottomOffset}`
            },
            endTrigger: section,
            end: 'bottom bottom',
            pin: introduction,
            pinSpacing: false,
            invalidateOnRefresh: true,
          })

          gsap.from(title, {
            y: 32,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 90%',
              once: true,
            },
          })

          let isActive = true

          if (document.fonts.status !== 'loaded') {
            void document.fonts.ready.then(() => {
              if (isActive) {
                sidebarPin.refresh()
              }
            })
          }

          return () => {
            isActive = false
          }
        },
        section,
      )

      return () => mediaQueries.revert()
    },
    { scope: sectionReference },
  )
}
