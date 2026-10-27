import type { RefObject } from 'react'
import {
  gsap,
  useGSAP,
  ScrollSmoother,
  ScrollTrigger,
} from '../../../../../lib/animation'

export function useSmoothScroll(
  wrapperReference: RefObject<HTMLDivElement | null>,
  contentReference: RefObject<HTMLElement | null>,
  navigationKey: string,
) {
  useGSAP(() => {
    const wrapper = wrapperReference.current
    const content = contentReference.current
    if (!wrapper || !content) return

    const mediaQueries = gsap.matchMedia()

    mediaQueries.add(
      '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
      () => {
        const scrollSmoother = ScrollSmoother.create({
          wrapper,
          content,
          smooth: 1,
          smoothTouch: 0,
          effects: true,
          // The router manages main-content focus without changing scroll position.
          onFocusIn: (_scrollSmoother, event: Event) =>
            !(
              event.target instanceof HTMLElement &&
              event.target.tagName === 'MAIN'
            ),
        })

        return () => scrollSmoother.kill()
      },
      wrapper,
    )

    return () => mediaQueries.revert()
  }, { scope: wrapperReference })

  useGSAP(
    (_context, contextSafe) => {
      if (!contextSafe) return

      // Update the page height before ScrollRestoration restores a saved position.
      ScrollTrigger.refresh()

      // Apply that position immediately after the router has restored it.
      const refreshFrame = requestAnimationFrame(contextSafe(() => {
        ScrollSmoother.get()?.scrollTo(window.scrollY, false)
      }))

      return () => cancelAnimationFrame(refreshFrame)
    },
    {
      scope: wrapperReference,
      dependencies: [navigationKey],
      revertOnUpdate: true,
    },
  )
}
