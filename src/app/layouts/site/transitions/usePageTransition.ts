import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { useLocation, useViewTransitionState } from 'react-router'
import { ScrollSmoother, useGSAP } from '../../../../lib/animation'
import './PageTransition.module.scss'

const scrollKeys = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
])

export function usePageTransition(
  mainContentReference: RefObject<HTMLElement | null>,
) {
  const location = useLocation()
  // Router-managed root snapshots include the fixed header and support animated
  // Back/Forward; React's element transitions can skip synchronous popstate updates.
  const isTransitioning = useViewTransitionState(location.pathname)
  const previousPathnameReference = useRef(location.pathname)

  useGSAP(
    () => {
      if (!isTransitioning) {
        return
      }

      const scrollSmoother = ScrollSmoother.get()

      // Stop pending momentum without paused(), whose scroll observer would
      // also reject the router's programmatic scroll restoration.
      scrollSmoother?.scrollTo(scrollSmoother.scrollTop(), false)

      const preventScroll = (event: Event) => {
        if (event.cancelable) {
          event.preventDefault()
        }
      }

      const preventScrollKey = (event: KeyboardEvent) => {
        const target = event.target
        const isEditing = target instanceof HTMLElement && (
          target.isContentEditable ||
          target.closest('input, textarea, select') !== null
        )

        if (scrollKeys.has(event.key) && !isEditing) {
          event.preventDefault()
        }
      }

      window.addEventListener('wheel', preventScroll, { passive: false })
      window.addEventListener('touchmove', preventScroll, { passive: false })
      window.addEventListener('keydown', preventScrollKey)

      return () => {
        window.removeEventListener('wheel', preventScroll)
        window.removeEventListener('touchmove', preventScroll)
        window.removeEventListener('keydown', preventScrollKey)
      }
    },
    {
      dependencies: [isTransitioning],
      revertOnUpdate: true,
    },
  )

  useEffect(() => {
    if (
      isTransitioning ||
      previousPathnameReference.current === location.pathname
    ) {
      return
    }

    // Focus the live page after the browser has removed the route snapshots.
    mainContentReference.current?.focus({ preventScroll: true })
    previousPathnameReference.current = location.pathname
  }, [isTransitioning, location.pathname, mainContentReference])
}
