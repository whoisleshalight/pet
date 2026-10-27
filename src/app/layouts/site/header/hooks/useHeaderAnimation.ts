import type { RefObject } from 'react'
import { gsap, useGSAP } from '../../../../../lib/animation'
import brandStyles from '../HeaderBrand.module.scss'
import introductionStyles from '../HeaderIntroduction.module.scss'
import {
  headerAnimationMediaQuery,
  introScrollDistance,
  introScrollSmoothingDuration,
} from '../headerAnimationSettings'

const brandLetterEasings = [
  'power1.inOut',
  'power2.inOut',
  'power3.inOut',
  'power4.inOut',
]

const headerTransitionDuration = 1.5
const brandRevealStart = 0.5

type HeaderAnimationOptions = {
  headerReference: RefObject<HTMLElement | null>
  navigationReference: RefObject<HTMLElement | null>
  brandTextReference: RefObject<HTMLSpanElement | null>
  titleReference: RefObject<HTMLDivElement | null>
  descriptionReference: RefObject<HTMLDivElement | null>
  availabilityReference: RefObject<HTMLDivElement | null>
  isHeaderExpanded: boolean
}

export function useHeaderAnimation({
  headerReference,
  navigationReference,
  brandTextReference,
  titleReference,
  descriptionReference,
  availabilityReference,
  isHeaderExpanded,
}: HeaderAnimationOptions) {
  useGSAP(
    () => {
      const header = headerReference.current
      const navigation = navigationReference.current
      const brandText = brandTextReference.current
      const title = titleReference.current
      const description = descriptionReference.current
      const availability = availabilityReference.current
      if (
        !isHeaderExpanded ||
        !header ||
        !navigation ||
        !brandText ||
        !title ||
        !description ||
        !availability
      ) return

      const mediaQueries = gsap.matchMedia()
      mediaQueries.add(headerAnimationMediaQuery, () => {
        const select = gsap.utils.selector(header)
        const words = gsap.utils.toArray<HTMLElement>(
          `.${introductionStyles.siteHeaderWord}`,
          title,
        )
        const entrance = gsap.timeline()

        words.forEach((word, wordIndex) => {
          entrance.fromTo(
            gsap.utils.selector(word)(`.${introductionStyles.siteHeaderLetterReveal}`),
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
          select(`.${introductionStyles.siteHeaderDescriptionContent}, .${introductionStyles.siteHeaderAvailabilityLink}`),
          {
            opacity: 0,
            y: 16,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0.4,
        )

        // Keep the grid stable; only transforms and opacity follow the scroll.
        const transition = gsap.timeline({
          defaults: {
            duration: headerTransitionDuration,
            ease: 'power1.inOut',
          },
          scrollTrigger: {
            trigger: header,
            start: 0,
            end: introScrollDistance,
            scrub: introScrollSmoothingDuration,
            invalidateOnRefresh: true,
          },
        })

        words.forEach((word, wordIndex) => {
          transition.to(
            gsap.utils.selector(word)(`.${introductionStyles.siteHeaderLetterContent}`),
            {
              yPercent: -115,
              duration: 1.05,
              stagger: {
                amount: 0.4,
                from: wordIndex === 0 ? 'start' : 'end',
              },
            },
            wordIndex * 0.05,
          )
        })

        transition.to(
          [description, availability],
          {
            autoAlpha: 0,
            y: () => brandText.offsetHeight - title.offsetHeight -
              parseFloat(getComputedStyle(header).rowGap),
          },
          0,
        )

        transition.to(
          navigation,
          { y: () => navigation.offsetHeight - title.offsetHeight },
          0,
        )

        gsap.set(brandText, { autoAlpha: 1 })
        gsap.utils
          .toArray<HTMLElement>(`.${brandStyles.siteHeaderBrandLetterContent}`, brandText)
          .forEach((letter, letterIndex) => {
            transition.fromTo(
              letter,
              { yPercent: 300 },
              {
                yPercent: 0,
                duration: headerTransitionDuration - brandRevealStart,
                ease: brandLetterEasings[
                  letterIndex % brandLetterEasings.length
                ],
              },
              brandRevealStart,
            )
          })
      }, header)

      return () => mediaQueries.revert()
    },
    {
      scope: headerReference,
      dependencies: [isHeaderExpanded],
      revertOnUpdate: true,
    },
  )
}
