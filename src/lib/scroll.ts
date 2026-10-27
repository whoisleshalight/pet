import { ScrollSmoother } from './animation'

export function scrollToPosition(top: number, smooth = true) {
  const scrollSmoother = ScrollSmoother.get()
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  const shouldSmooth = smooth && !reduceMotion

  if (scrollSmoother) {
    scrollSmoother.scrollTo(top, shouldSmooth)
    return
  }

  window.scrollTo({ top, behavior: shouldSmooth ? 'smooth' : 'instant' })
}

export function scrollToTop() {
  scrollToPosition(0)
}
