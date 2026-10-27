import type { RefObject } from 'react'
import { gsap, useGSAP } from '../../../../lib/animation'
import {
  headerAnimationMediaQuery,
  introScrollDistance,
  introScrollSmoothingDuration,
} from './headerAnimationSettings'

const brandLetterEasings = [
  'power1.inOut',
  'power2.inOut',
  'power3.inOut',
  'power4.inOut',
]

const headerTransitionDuration = 1.5

export function useHeaderAnimation(
  headerReference: RefObject<HTMLElement | null>,
  isHeaderExpanded: boolean,
) {
  useGSAP(
    () => {
      const header = headerReference.current
      if (!header || !isHeaderExpanded) return

      const mediaQueries = gsap.matchMedia()
      mediaQueries.add(headerAnimationMediaQuery, () => {
        const entrance = gsap.timeline()
        const words = gsap.utils.toArray<HTMLElement>('.siteHeaderWord')

        words.forEach((word, wordIndex) => {
          entrance.fromTo(
            word.querySelectorAll('.siteHeaderLetterReveal'),
            { yPercent: 120, rotation: 6, transformOrigin: '0% 100%' },
            {
              yPercent: 0,
              rotation: 0,
              duration: 1.2,
              ease: 'power4.out',
              stagger: {
                amount: 0.35,
                from: wordIndex === 0 ? 'start' : 'end',
              },
            },
            0.12 + wordIndex * 0.16,
          )
        })

        entrance.from(
          '.siteHeaderDescriptionContent, .siteHeaderAvailabilityLink',
          {
            opacity: 0,
            y: 16,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0.4,
        )

        // The complete header follows one timeline outside ScrollSmoother's transform.
        const transition = gsap.timeline({
          scrollTrigger: {
            start: 0,
            end: introScrollDistance,
            scrub: introScrollSmoothingDuration,
            invalidateOnRefresh: true,
          },
        })

        transition.to(
          '.siteHeaderTitle',
          {
            height: '1.2em',
            duration: headerTransitionDuration,
            ease: 'power1.inOut',
          },
          0,
        )

        transition.to(
          header,
          {
            rowGap: 0,
            duration: headerTransitionDuration,
            ease: 'power1.inOut',
          },
          0,
        )

        words.forEach((word, wordIndex) => {
          transition.to(
            word.querySelectorAll('.siteHeaderLetterContent'),
            {
              yPercent: -115,
              duration: 1.05,
              ease: 'power1.inOut',
              stagger: {
                amount: 0.4,
                from: wordIndex === 0 ? 'start' : 'end',
              },
            },
            wordIndex * 0.05,
          )
        })

        transition.to(
          '.siteHeaderDescription, .siteHeaderAvailability',
          {
            autoAlpha: 0,
            height: 0,
            duration: headerTransitionDuration,
            ease: 'power1.inOut',
          },
          0,
        )

        transition.to(
          '.siteHeaderNavigation',
          {
            y: 0,
            duration: headerTransitionDuration,
            ease: 'power1.inOut',
          },
          0,
        )

        gsap.set('.siteHeaderBrandText', { autoAlpha: 1 })
        gsap.utils
          .toArray<HTMLElement>('.siteHeaderBrandLetterContent')
          .forEach((letter, letterIndex) => {
            transition.fromTo(
              letter,
              { yPercent: 300  },
              {
                yPercent: 0,
                duration: 0.5,
                ease: brandLetterEasings[
                  letterIndex % brandLetterEasings.length
                ],
              },
              0.8,
            )
          })
      })

      return () => mediaQueries.revert()
    },
    {
      scope: headerReference,
      dependencies: [isHeaderExpanded],
      revertOnUpdate: true,
    },
  )
}
