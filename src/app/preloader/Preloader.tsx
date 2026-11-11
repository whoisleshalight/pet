import { useRef } from 'react'
import { gsap, ScrollSmoother, useGSAP } from '../../lib/animation'
import { getInitialPageResources } from './initialPageResources'
import styles from './Preloader.module.scss'

interface PreloaderProps {
  isPageReady: boolean
  onComplete: () => void
}

export function Preloader({ isPageReady, onComplete }: PreloaderProps) {
  const preloaderReference = useRef<HTMLDivElement>(null)
  const panelReference = useRef<HTMLDivElement>(null)
  const shadeReference = useRef<HTMLDivElement>(null)
  const meterReference = useRef<HTMLDivElement>(null)
  const counterReference = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useGSAP((_context, contextSafe) => {
    if (!isPageReady || !contextSafe) {
      return
    }

    const preloader = preloaderReference.current
    const counter = counterReference.current
    if (!preloader || !counter) {
      return
    }

    const abortController = new AbortController()
    const scrollSmoother = ScrollSmoother.get()
    const wasScrollPaused = scrollSmoother?.paused() ?? false
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const progress = { value: 0 }
    const resources = getInitialPageResources(abortController.signal)
    const totalResources = resources.length + 1
    let settledResources = 1

    scrollSmoother?.paused(true)

    const updateProgress = () => {
      const percentage = Math.round(progress.value)
      counter.textContent = String(percentage)
      preloader.setAttribute('aria-valuenow', String(percentage))
    }

    const revealPage = gsap.timeline({ paused: true, onComplete })
    revealPage
      // Keep the completed counter fully visible before starting its exit.
      .addLabel('hideCounter', reducedMotion.matches ? 0 : 0.3)
      .to(meterReference.current, {
        y: () => reducedMotion.matches ? 0 : -24,
        opacity: 0,
        duration: () => reducedMotion.matches ? 0 : 0.4,
      }, 'hideCounter')
      .to(panelReference.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: () => reducedMotion.matches ? 0 : 0.8,
        ease: 'power4.inOut',
      })
      .to(shadeReference.current, {
        opacity: 0,
        duration: () => reducedMotion.matches ? 0 : 0.8,
        ease: 'power2.out',
      }, '<')

    // Animate toward actual readiness, keeping the counter visible on cached loads.
    // Resource promises settle outside useGSAP, so their tweens need contextSafe.
    const animateProgress = contextSafe(() => {
      const percentage = settledResources / totalResources * 100
      const isComplete = settledResources === totalResources
      let duration = 0

      if (!reducedMotion.matches) {
        duration = isComplete ? 1.2 : 0.4
      }

      gsap.to(progress, {
        value: percentage,
        duration,
        ease: 'power1.inOut',
        overwrite: true,
        onUpdate: updateProgress,
        onComplete: () => {
          if (isComplete) {
            progress.value = 100
            updateProgress()
            revealPage.play(0)
          }
        },
      })
    })

    animateProgress()

    resources.forEach((resource) => {
      const handleSettledResource = () => {
        if (abortController.signal.aborted) {
          return
        }

        settledResources += 1
        animateProgress()
      }

      void resource.then(handleSettledResource, handleSettledResource)
    })

    return () => {
      abortController.abort()
      scrollSmoother?.paused(wasScrollPaused)
    }
  }, {
    scope: preloaderReference,
    dependencies: [isPageReady, onComplete],
    revertOnUpdate: true,
  })

  return (
    <div
      ref={preloaderReference}
      className={styles.preloader}
      role="progressbar"
      aria-label="Loading page"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <div ref={shadeReference} className={styles.shade} />
      <div ref={panelReference} className={styles.panel}>
        <div ref={meterReference} className={styles.meter} aria-hidden="true">
          <div className={styles.counter}>
            <span ref={counterReference}>0</span>
            <span className={styles.percent}>%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
