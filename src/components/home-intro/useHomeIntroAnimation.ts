import type { RefObject } from 'react'
import { getIntroScrollDistance, gsap, useGSAP } from '../../lib/animation'

const letterEasings = [
  'power1.inOut',
  'power2.inOut',
  'power3.inOut',
  'power4.inOut',
]

export function useHomeIntroAnimation(
  introductionReference: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const mediaQueries = gsap.matchMedia()

      mediaQueries.add(
        '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
        () => {
          const entrance = gsap.timeline()
          entrance.from(
            '.home-intro__word',
            { yPercent: 110, duration: 1.8, ease: 'power4.inOut' },
            0,
          )
          entrance.from(
            '.home-intro__description-content, .home-intro__availability-link',
            {
              opacity: 0,
              y: 10,
              duration: 1.5,
              ease: 'power2.out',
            },
            0.65,
          )

          const transition = gsap.timeline({
            scrollTrigger: {
              trigger: introductionReference.current,
              start: 'top top',
              end: getIntroScrollDistance,
              pin: '.home-intro__content',
              pinSpacing: false,
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          })

          // Each letter moves at its own pace, as in the reference intro.
          gsap.utils
            .toArray<HTMLElement>('.home-intro__letter-content')
            .forEach((letter, letterIndex) => {
              transition.to(
                letter,
                {
                  yPercent: -105,
                  duration: 1.5,
                  ease: letterEasings[letterIndex % letterEasings.length],
                },
                0,
              )
            })

          transition.to(
            '.home-intro__description, .home-intro__availability',
            {
              y: () => 17 - window.innerWidth * 0.1,
              autoAlpha: 0,
              duration: 1.5,
              ease: 'power1.inOut',
            },
            0,
          )
        },
      )

      return () => mediaQueries.revert()
    },
    { scope: introductionReference },
  )
}
