import { ScrollSmoother } from './animation'

export function scrollToTop() {
  const scrollSmoother = ScrollSmoother.get()

  if (scrollSmoother) {
    scrollSmoother.scrollTo(0, true)
    return
  }

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })
}
