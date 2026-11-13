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

  useGSAP(() => {
    if (!isPageReady) {
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
    const resources = getInitialPageResources(abortController.signal)
    const totalResources = resources.length + 1
    let settledResources = 1

    scrollSmoother?.paused(true)

    const updateProgress = () => {
      const percentage = Math.round(settledResources / totalResources * 100)
      counter.textContent = String(percentage)
      preloader.setAttribute('aria-valuenow', String(percentage))
    }

    const revealPage = gsap.timeline({ paused: true, onComplete })
    revealPage
      .addLabel('revealPage')
      .to(meterReference.current, {
        y: () => reducedMotion.matches ? 0 : -24,
        opacity: 0,
        duration: () => reducedMotion.matches ? 0 : 0.4,
      }, 'revealPage')
      .to(panelReference.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: () => reducedMotion.matches ? 0 : 0.8,
        ease: 'power4.inOut',
      }, 'revealPage')
      .to(shadeReference.current, {
        opacity: 0,
        duration: () => reducedMotion.matches ? 0 : 0.8,
        ease: 'power2.out',
      }, '<')

    updateProgress()

    resources.forEach((resource) => {
      const handleSettledResource = () => {
        if (abortController.signal.aborted) {
          return
        }

        settledResources += 1
        updateProgress()

        if (settledResources === totalResources) {
          revealPage.play(0)
        }
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
