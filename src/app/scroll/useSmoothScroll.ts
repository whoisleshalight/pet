import type { RefObject } from 'react'
import {
  gsap,
  useGSAP,
  ScrollSmoother,
  ScrollTrigger,
} from '../../lib/animation'

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
          smooth: 0.6,
          smoothTouch: 0,
          effects: true,
          // Route focus should not override the position restored by the router.
          onFocusIn: (_scrollSmoother, event: Event) =>
            event.target !== content,
        })

        return () => scrollSmoother.kill()
      },
    )

    return () => mediaQueries.revert()
  })

  useGSAP(
    () => {
      // Update the page height before ScrollRestoration restores a saved position.
      ScrollTrigger.refresh()

      // Apply that position immediately after the router has restored it.
      const refreshFrame = requestAnimationFrame(() => {
        ScrollSmoother.get()?.scrollTo(window.scrollY, false)
      })

      return () => cancelAnimationFrame(refreshFrame)
    },
    { dependencies: [navigationKey], revertOnUpdate: true },
  )
}
