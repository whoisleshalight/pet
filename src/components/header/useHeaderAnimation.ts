import type { RefObject } from 'react'
import { getIntroScrollDistance, gsap, useGSAP } from '../../lib/animation'

export function useHeaderAnimation(
  headerReference: RefObject<HTMLElement | null>,
  isHomePage: boolean,
) {
  useGSAP(
    () => {
      if (!isHomePage) return

      const mediaQueries = gsap.matchMedia()

      mediaQueries.add(
        '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
        () => {
          const compactHeaderTop = 17
          const transition = gsap.timeline({
            scrollTrigger: {
              start: 0,
              end: getIntroScrollDistance,
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          })

          transition.fromTo(
            '.site-header__navigation',
            { y: 0 },
            {
              y: () => compactHeaderTop - window.innerWidth * 0.1,
              duration: 1.5,
              ease: 'power1.inOut',
            },
            0,
          )
          transition.fromTo(
            '.site-header__brand-text',
            { yPercent: 110, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.inOut' },
            0.8,
          )
        },
      )

      return () => mediaQueries.revert()
    },
    {
      scope: headerReference,
      dependencies: [isHomePage],
      revertOnUpdate: true,
    },
  )
}
