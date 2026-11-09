import type { RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../../../../lib/animation'
import { getCursorAppearance } from '../cursorAppearance'
import type { CursorAppearance } from '../cursorAppearance'

const pointerListenerOptions = { capture: true, passive: true }

export function useCursorFollower(
  cursorReference: RefObject<HTMLDivElement | null>,
  labelReference: RefObject<HTMLSpanElement | null>,
) {
  useGSAP(() => {
    const cursor = cursorReference.current
    const label = labelReference.current

    if (!cursor || !label) {
      return
    }

    const mediaQueries = gsap.matchMedia()

    mediaQueries.add(
      '(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)',
      () => {
        const moveCursorX = gsap.quickTo(cursor, 'x', {
          duration: 0.35,
          ease: 'power3.out',
        })
        const moveCursorY = gsap.quickTo(cursor, 'y', {
          duration: 0.35,
          ease: 'power3.out',
        })
        let pointerX = 0
        let pointerY = 0
        let isPointerActive = false
        let hoverFrame = 0
        let currentMode: CursorAppearance['mode'] = 'hidden'
        let currentLabel = ''

        const applyAppearance = (appearance: CursorAppearance) => {
          const nextLabel = appearance.mode === 'label' ? appearance.label : ''

          if (appearance.mode !== currentMode) {
            currentMode = appearance.mode
            cursor.dataset.mode = appearance.mode
            cursor.toggleAttribute('data-visible', appearance.mode !== 'hidden')
          }

          if (nextLabel !== currentLabel) {
            currentLabel = nextLabel
            label.textContent = nextLabel
          }
        }

        const updateHoveredElement = () => {
          hoverFrame = 0

          if (!isPointerActive) {
            return
          }

          const element = document.elementFromPoint(pointerX, pointerY)
          applyAppearance(getCursorAppearance(element))
        }

        const scheduleHoverUpdate = () => {
          if (isPointerActive && !hoverFrame) {
            hoverFrame = requestAnimationFrame(updateHoveredElement)
          }
        }

        const mutationObserver = new MutationObserver((mutations) => {
          // Ignore our own label changes to avoid scheduling a feedback loop.
          if (mutations.some((mutation) => !cursor.contains(mutation.target))) {
            scheduleHoverUpdate()
          }
        })

        const deactivatePointer = () => {
          isPointerActive = false
          cancelAnimationFrame(hoverFrame)
          hoverFrame = 0
          mutationObserver.disconnect()
          moveCursorX.tween.pause()
          moveCursorY.tween.pause()
          applyAppearance({ mode: 'hidden' })
          cursor.removeAttribute('data-pressed')
        }

        const updatePointerPosition = (event: PointerEvent) => {
          if (event.pointerType !== 'mouse') {
            deactivatePointer()
            return
          }

          pointerX = event.clientX
          pointerY = event.clientY

          if (!isPointerActive) {
            // Re-entry starts at the pointer, including a click after keyboard use.
            moveCursorX(pointerX, pointerX)
            moveCursorY(pointerY, pointerY)
            isPointerActive = true
            mutationObserver.observe(document.body, {
              subtree: true,
              childList: true,
              attributes: true,
              attributeFilter: [
                'data-cursor',
                'data-cursor-label',
                'href',
                'disabled',
                'aria-disabled',
                'contenteditable',
                'hidden',
                'inert',
                'class',
              ],
            })
          } else {
            moveCursorX(pointerX)
            moveCursorY(pointerY)
          }

          cursor.toggleAttribute('data-pressed', (event.buttons & 1) !== 0)
          scheduleHoverUpdate()
        }

        const handlePointerUp = (event: PointerEvent) => {
          if (event.pointerType === 'mouse') {
            cursor.toggleAttribute('data-pressed', (event.buttons & 1) !== 0)
          }
        }

        const handlePointerOut = (event: PointerEvent) => {
          if (!event.relatedTarget) {
            deactivatePointer()
          }
        }

        // ScrollSmoother updates ScrollTrigger as the rendered content moves.
        // This also covers the easing after native scroll events have stopped.
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: scheduleHoverUpdate,
          onRefresh: scheduleHoverUpdate,
        })

        // Capture keeps component event handlers from interrupting the follower.
        document.addEventListener('pointermove', updatePointerPosition, pointerListenerOptions)
        document.addEventListener('pointerdown', updatePointerPosition, pointerListenerOptions)
        document.addEventListener('pointerup', handlePointerUp, pointerListenerOptions)
        document.addEventListener('pointerover', scheduleHoverUpdate, true)
        document.addEventListener('pointerout', handlePointerOut, true)
        document.addEventListener('pointercancel', deactivatePointer, true)
        document.addEventListener('dragstart', deactivatePointer, true)
        document.addEventListener('keydown', deactivatePointer, true)
        document.addEventListener('visibilitychange', deactivatePointer)
        document.addEventListener('scroll', scheduleHoverUpdate, pointerListenerOptions)
        document.addEventListener('load', scheduleHoverUpdate, true)
        window.addEventListener('resize', scheduleHoverUpdate)
        window.addEventListener('blur', deactivatePointer)

        return () => {
          document.removeEventListener('pointermove', updatePointerPosition, true)
          document.removeEventListener('pointerdown', updatePointerPosition, true)
          document.removeEventListener('pointerup', handlePointerUp, true)
          document.removeEventListener('pointerover', scheduleHoverUpdate, true)
          document.removeEventListener('pointerout', handlePointerOut, true)
          document.removeEventListener('pointercancel', deactivatePointer, true)
          document.removeEventListener('dragstart', deactivatePointer, true)
          document.removeEventListener('keydown', deactivatePointer, true)
          document.removeEventListener('visibilitychange', deactivatePointer)
          document.removeEventListener('scroll', scheduleHoverUpdate, true)
          document.removeEventListener('load', scheduleHoverUpdate, true)
          window.removeEventListener('resize', scheduleHoverUpdate)
          window.removeEventListener('blur', deactivatePointer)
          deactivatePointer()
        }
      },
    )

    return () => mediaQueries.revert()
  }, { scope: cursorReference })
}
