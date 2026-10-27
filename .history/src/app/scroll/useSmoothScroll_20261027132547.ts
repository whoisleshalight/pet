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
  useGSAP(
    () => {
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

          // The new page and the router's scroll restoration must finish first.
          const refreshFrame = requestAnimationFrame(() => {
            ScrollTrigger.refresh()
            scrollSmoother.scrollTo(window.scrollY, false)
          })

          return () => {
            cancelAnimationFrame(refreshFrame)
            scrollSmoother.kill()
          }
        },
      )

      return () => mediaQueries.revert()
    },
    {
      dependencies: [navigationKey],
      revertOnUpdate: true,
    },
  )
}
