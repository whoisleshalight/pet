import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../../../../lib/animation'
import { scrollToPosition } from '../../../../../lib/scroll'

export function useProjectGalleryScroll(
  sectionReference: RefObject<HTMLElement | null>,
  viewportReference: RefObject<HTMLDivElement | null>,
  trackReference: RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      const section = sectionReference.current
      const viewport = viewportReference.current
      const track = trackReference.current

      if (!section || !viewport || !track) {
        return
      }

      const mediaQueries = gsap.matchMedia()

      mediaQueries.add(
        '(min-width: 1200px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)',
        () => {
          const getScrollDistance = () => {
            return Math.max(0, track.scrollWidth - viewport.clientWidth)
          }

          const horizontalAnimation = gsap.to(track, {
            x: () => -getScrollDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: viewport,
              start: () => `top top+=${getComputedStyle(section).paddingBlockStart}`,
              end: () => `+=${getScrollDistance()}`,
              pin: viewport,
              pinSpacing: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 1,
            },
          })

          const scrollTrigger = horizontalAnimation.scrollTrigger

          // Reveal links reached by Tab even when their card is outside the viewport.
          const handleFocusIn = (event: FocusEvent) => {
            if (!(event.target instanceof HTMLElement) || !scrollTrigger) {
              return
            }

            const focusedBounds = event.target.getBoundingClientRect()
            const viewportBounds = viewport.getBoundingClientRect()
            const focusMargin = 40
            let horizontalOffset: number

            if (focusedBounds.left < viewportBounds.left + focusMargin) {
              horizontalOffset = focusedBounds.left - viewportBounds.left - focusMargin
            } else if (focusedBounds.right > viewportBounds.right - focusMargin) {
              horizontalOffset = focusedBounds.right - viewportBounds.right + focusMargin
            } else {
              return
            }

            const scrollDistance = getScrollDistance()
            const currentOffset = horizontalAnimation.progress() * scrollDistance
            const nextOffset = gsap.utils.clamp(
              0,
              scrollDistance,
              currentOffset + horizontalOffset,
            )

            scrollToPosition(scrollTrigger.start + nextOffset, false)
          }

          track.addEventListener('focusin', handleFocusIn)

          // Refresh after pin spacing is added so the existing footer follows it.
          ScrollTrigger.refresh()

          let isActive = true

          if (document.fonts.status !== 'loaded') {
            void document.fonts.ready.then(() => {
              if (isActive) {
                ScrollTrigger.refresh()
              }
            })
          }

          return () => {
            isActive = false
            track.removeEventListener('focusin', handleFocusIn)
          }
        },
        section,
      )

      return () => mediaQueries.revert()
    },
    { scope: sectionReference },
  )
}
