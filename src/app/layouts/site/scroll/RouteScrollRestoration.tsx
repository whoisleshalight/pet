import { ScrollRestoration } from 'react-router'
import { ScrollSmoother, useGSAP } from '../../../../lib/animation'

interface RouteScrollRestorationProps {
  navigationKey: string
}

export function RouteScrollRestoration({
  navigationKey,
}: RouteScrollRestorationProps) {
  useGSAP(
    (_context, contextSafe) => {
      if (!contextSafe) {
        return
      }

      // The child's layout effect restores the router position first. Capture
      // it before pin refreshes or a pending smoother tween can change it.
      const restoredPosition = window.scrollY
      ScrollSmoother.get()?.scrollTo(restoredPosition, false)

      const synchronizationFrame = requestAnimationFrame(contextSafe(() => {
        ScrollSmoother.get()?.scrollTo(restoredPosition, false)
      }))

      return () => cancelAnimationFrame(synchronizationFrame)
    },
    {
      dependencies: [navigationKey],
      revertOnUpdate: true,
    },
  )

  return <ScrollRestoration />
}
