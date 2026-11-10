import type { RefObject } from 'react'
import { Observer } from 'gsap/Observer'
import { newsFeedMotionQuery } from '../../../../../features/news/newsFeedSettings'
import { gsap, useGSAP } from '../../../../../lib/animation'
import styles from '../NewsFeed.module.scss'

gsap.registerPlugin(Observer)

interface NewsFeedAnimationOptions {
  sectionReference: RefObject<HTMLElement | null>
  galleryReference: RefObject<HTMLDivElement | null>
}

interface AnimatedColumn {
  timeline: gsap.core.Timeline
  cards: HTMLElement[]
  offsets: number[]
  distance: number
  direction: number
}

const pixelsPerSecond = 40
const scrollStrength = 3
const loopIterationBuffer = 100

export function useNewsFeedAnimation({
  sectionReference,
  galleryReference,
}: NewsFeedAnimationOptions) {
  useGSAP(() => {
    const section = sectionReference.current
    const gallery = galleryReference.current

    if (!section || !gallery) {
      return
    }

    const mediaQueries = gsap.matchMedia()

    mediaQueries.add(newsFeedMotionQuery, () => {
      const cards = Array.from(gallery.querySelectorAll<HTMLElement>(`.${styles.card}`))
      const columnAnimationContext = gsap.context(() => {}, gallery)
      let animatedColumns: AnimatedColumn[] = []
      let isVisible = true
      let scrollDirection = 1
      const motion = { timeScale: 1 }

      const updateTimeScale = gsap.quickTo(motion, 'timeScale', {
        duration: 0.5,
        ease: 'power3.out',
        onUpdate: () => {
          for (const column of animatedColumns) {
            column.timeline.timeScale(motion.timeScale)
          }
        },
      })

      const synchronizePlayback = () => {
        const isDocumentHidden = document.visibilityState === 'hidden'

        for (const column of animatedColumns) {
          column.timeline.paused(isDocumentHidden || !isVisible)
        }
      }

      const buildColumns = () => {
        const previousProgress = animatedColumns.map((column) => column.timeline.progress())
        columnAnimationContext.revert()

        // Reuse the context so resizing releases the previous tweens and measurements.
        columnAnimationContext.add(() => {
          animatedColumns = [0, 1, 2].map((columnIndex) => {
            const columnCards = cards.filter((card) => {
              return Number(card.dataset.newsColumn) === columnIndex
            })
            const direction = columnIndex === 1 ? 1 : -1
            const startingOffset = columnIndex === 1 ? 110 : 0
            const offsets: number[] = []
            let distance = 0

            for (const card of columnCards) {
              offsets.push(distance + startingOffset)
              distance += card.offsetHeight
            }

            const duration = distance / pixelsPerSecond
            const timeline = gsap.timeline({
              repeat: -1,
              paused: true,
              onReverseComplete: () => {
                timeline.totalTime(timeline.rawTime() + duration * loopIterationBuffer)
              },
            })

            columnCards.forEach((card, cardIndex) => {
              // Wrap a real card only after it leaves the viewport.
              const wrapPosition = gsap.utils.wrap(
                -card.offsetHeight,
                distance - card.offsetHeight,
              )
              const offset = offsets[cardIndex]

              timeline.fromTo(
                card,
                { y: offset },
                {
                  y: offset + direction * distance,
                  duration,
                  ease: 'none',
                  modifiers: {
                    y: (value: string) => {
                      return `${wrapPosition(Number.parseFloat(value))}px`
                    },
                  },
                  immediateRender: true,
                },
                0,
              )
            })

            // Leave full iterations before the playhead for immediate, seamless reversal.
            const initialProgress = previousProgress[columnIndex] ?? 0
            timeline.totalTime(duration * (loopIterationBuffer + initialProgress), true)
            timeline.timeScale(motion.timeScale)
            return { timeline, cards: columnCards, offsets, distance, direction }
          })
        })

        synchronizePlayback()
      }

      buildColumns()

      const wheelObserver = Observer.create({
        target: window,
        type: 'wheel',
        preventDefault: false,
        tolerance: 1,
        onStopDelay: 0.2,
        ignoreCheck: (event) => {
          return event instanceof WheelEvent && (
            event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)
          )
        },
        onChangeY: (observer) => {
          if (!isVisible || document.visibilityState === 'hidden') {
            return
          }

          scrollDirection = observer.deltaY > 0 ? 1 : -1
          const inputSpeed = Math.max(
            Math.abs(observer.velocityY) * 0.25,
            Math.abs(observer.deltaY) * 3,
          )
          const timeScale = gsap.utils.clamp(1, 12, inputSpeed / pixelsPerSecond) * scrollStrength

          updateTimeScale(scrollDirection * timeScale)
        },
        onStop: () => {
          updateTimeScale(scrollDirection)
        },
      })

      const resizeObserver = new ResizeObserver(buildColumns)

      for (const card of cards) {
        resizeObserver.observe(card)
      }

      const visibilityObserver = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting
        synchronizePlayback()
      })
      visibilityObserver.observe(section)

      const handleFocusIn = (event: FocusEvent) => {
        if (!(event.target instanceof HTMLElement)) {
          return
        }

        const focusedCard = event.target.closest<HTMLElement>(`.${styles.card}`)

        if (!focusedCard) {
          return
        }

        const column = animatedColumns.find((column) => column.cards.includes(focusedCard))

        // Pointer focus must preserve the card position before the route snapshot.
        if (column && event.target.matches(':focus-visible')) {
          const cardIndex = column.cards.indexOf(focusedCard)
          const cardBounds = focusedCard.getBoundingClientRect()
          const galleryBounds = gallery.getBoundingClientRect()
          const visibleBottom = Math.min(galleryBounds.bottom, window.innerHeight)
          const linkHeight = focusedCard.firstElementChild?.getBoundingClientRect().height ?? cardBounds.height

          if (cardBounds.top < galleryBounds.top || cardBounds.top + linkHeight > visibleBottom) {
            const phase = (8 - column.offsets[cardIndex]) / (column.direction * column.distance)
            column.timeline.progress(gsap.utils.wrap(0, 1, phase))
          }
        }
      }

      gallery.addEventListener('focusin', handleFocusIn)
      document.addEventListener('visibilitychange', synchronizePlayback)

      return () => {
        resizeObserver.disconnect()
        visibilityObserver.disconnect()
        wheelObserver.kill()
        gallery.removeEventListener('focusin', handleFocusIn)
        document.removeEventListener('visibilitychange', synchronizePlayback)
        columnAnimationContext.revert()
        animatedColumns = []
      }
    }, section)

    return () => mediaQueries.revert()
  }, { scope: sectionReference })
}
