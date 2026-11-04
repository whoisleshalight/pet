import type { RefObject } from 'react'
import { gsap, useGSAP } from '../../../../../lib/animation'

export function useFeaturedProjectParallax(
  cardReference: RefObject<HTMLAnchorElement | null>,
  mediaReference: RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      const card = cardReference.current
      const media = mediaReference.current

      if (!card || !media) {
        return
      }

      const mediaQueries = gsap.matchMedia()

      mediaQueries.add('(prefers-reduced-motion: no-preference)', () => {
        // Keep the image covering the card at both ends of its scroll travel.
        const getTravelDistance = () => {
          return Math.max(0, (media.offsetHeight - card.offsetHeight) / 2)
        }

        gsap.fromTo(
          media,
          { y: getTravelDistance, scale: 1 },
          {
            y: () => -getTravelDistance(),
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      return () => mediaQueries.revert()
    },
    { scope: cardReference },
  )
}
