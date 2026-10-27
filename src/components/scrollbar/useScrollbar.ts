import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent, RefObject } from 'react'
import { gsap, ScrollSmoother, ScrollTrigger } from '../../lib/animation'
import { scrollToPosition } from '../../lib/scroll'
import { scrollbarSettings } from './scrollbarSettings'

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export function useScrollbar(
  scrollbarReference: RefObject<HTMLDivElement | null>,
  contentReference: RefObject<HTMLElement | null>,
  navigationKey: string,
) {
  const [layout, setLayout] = useState({
    lineCount: scrollbarSettings.minimumLines as number,
    isScrollable: false,
  })
  const metricsReference = useRef({ maxScroll: 0, viewportHeight: 0 })
  const pointerReference = useRef<{
    pointerId: number
    startY: number
    isDragging: boolean
  } | null>(null)

  useEffect(() => {
    const scrollbar = scrollbarReference.current
    const content = contentReference.current
    if (!scrollbar || !content) return

    let measureFrame = 0
    let activeLine: Element | null = null
    let previousPercentage = -1

    const updateProgress = () => {
      const { maxScroll } = metricsReference.current
      if (maxScroll <= 1) return

      // Follow the rendered content while ScrollSmoother catches up to the wheel.
      const position = ScrollSmoother.get()?.scrollTop() ?? window.scrollY
      const progress = clamp(position / maxScroll, 0, 1)
      const lines = scrollbar.children
      const nextLine = lines[Math.round(progress * (lines.length - 1))]

      if (nextLine !== activeLine) {
        activeLine?.removeAttribute('data-active')
        nextLine?.setAttribute('data-active', '')
        activeLine = nextLine ?? null
      }

      const percentage = Math.round(progress * 100)
      if (percentage !== previousPercentage) {
        scrollbar.setAttribute('aria-valuenow', String(percentage))
        previousPercentage = percentage
      }
    }

    const measure = () => {
      measureFrame = 0
      const viewportHeight = document.documentElement.clientHeight
      const maxScroll = Math.max(0, ScrollTrigger.maxScroll(window))
      metricsReference.current = { maxScroll, viewportHeight }

      // Read the CSS dimensions so breakpoints and mark spacing stay in SCSS.
      const availableHeight = parseFloat(getComputedStyle(scrollbar).maxHeight)
      const firstLine = scrollbar.firstElementChild
      const lineHeight = firstLine
        ? parseFloat(getComputedStyle(firstLine).height)
        : 10
      const capacity = Math.max(
        scrollbarSettings.minimumLines,
        Math.floor(availableHeight / lineHeight),
      )
      const lineCount = clamp(
        Math.ceil((maxScroll + viewportHeight) / scrollbarSettings.pixelsPerLine),
        scrollbarSettings.minimumLines,
        capacity,
      )
      const isScrollable = maxScroll > 1

      setLayout((previous) =>
        previous.lineCount === lineCount && previous.isScrollable === isScrollable
          ? previous
          : { lineCount, isScrollable },
      )
      updateProgress()
    }

    const scheduleMeasure = () => {
      if (!measureFrame) measureFrame = requestAnimationFrame(measure)
    }

    const resizeObserver = new ResizeObserver(scheduleMeasure)
    resizeObserver.observe(content)
    resizeObserver.observe(document.body)
    resizeObserver.observe(document.documentElement)
    window.addEventListener('resize', scheduleMeasure)
    ScrollTrigger.addEventListener('refresh', scheduleMeasure)
    gsap.ticker.add(updateProgress)
    scheduleMeasure()

    return () => {
      cancelAnimationFrame(measureFrame)
      resizeObserver.disconnect()
      window.removeEventListener('resize', scheduleMeasure)
      ScrollTrigger.removeEventListener('refresh', scheduleMeasure)
      gsap.ticker.remove(updateProgress)
      activeLine?.removeAttribute('data-active')
      const pointerId = pointerReference.current?.pointerId
      if (pointerId !== undefined && scrollbar.hasPointerCapture(pointerId)) {
        scrollbar.releasePointerCapture(pointerId)
      }
      pointerReference.current = null
      scrollbar.removeAttribute('data-dragging')
    }
  }, [scrollbarReference, contentReference, navigationKey])

  const scrollFromPointer = (
    event: PointerEvent<HTMLDivElement>,
    smooth: boolean,
  ) => {
    const scrollbar = event.currentTarget
    const bounds = scrollbar.getBoundingClientRect()
    const lineHeight = bounds.height / scrollbar.children.length
    const progress = clamp(
      (event.clientY - bounds.top - lineHeight / 2) /
        Math.max(1, bounds.height - lineHeight),
      0,
      1,
    )
    scrollToPosition(progress * metricsReference.current.maxScroll, smooth)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return
    event.preventDefault()
    pointerReference.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      isDragging: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.focus({ preventScroll: true })
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const pointer = pointerReference.current
    if (pointer?.pointerId !== event.pointerId) return
    if (
      !pointer.isDragging &&
      Math.abs(event.clientY - pointer.startY) < scrollbarSettings.dragThreshold
    ) {
      return
    }

    pointer.isDragging = true
    event.currentTarget.setAttribute('data-dragging', '')
    scrollFromPointer(event, false)
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const pointer = pointerReference.current
    if (pointer?.pointerId !== event.pointerId) return
    // A click animates on release; dragging follows the pointer immediately.
    if (event.type === 'pointerup') scrollFromPointer(event, !pointer.isDragging)
    pointerReference.current = null
    event.currentTarget.removeAttribute('data-dragging')
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const { maxScroll, viewportHeight } = metricsReference.current
    const position = ScrollSmoother.get()?.scrollTop() ?? window.scrollY
    const step = scrollbarSettings.keyboardStep
    const destinations: Record<string, number> = {
      ArrowDown: position + step,
      ArrowUp: position - step,
      PageDown: position + viewportHeight,
      PageUp: position - viewportHeight,
      Home: 0,
      End: maxScroll,
    }
    const destination = destinations[event.key]
    if (destination === undefined) return
    event.preventDefault()
    scrollToPosition(clamp(destination, 0, maxScroll))
  }

  return {
    ...layout,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
    onLostPointerCapture: onPointerUp,
    onKeyDown,
  }
}
