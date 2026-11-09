import { useEffect } from 'react'
import type { RefObject } from 'react'

export function useHeroVideo(
  videoReference: RefObject<HTMLVideoElement | null>,
) {
  useEffect(() => {
    const video = videoReference.current

    if (!video) {
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isVisible = false
    let isDisposed = false

    function shouldPlayVideo() {
      return isVisible && !document.hidden && !reducedMotion.matches
    }

    function synchronizePlayback() {
      if (!video) {
        return
      }

      if (!shouldPlayVideo()) {
        video.pause()
        return
      }

      if (!video.paused) {
        return
      }

      void video
        .play()
        .then(() => {
          if (isDisposed) {
            return
          }

          if (!shouldPlayVideo()) {
            video.pause()
          }
        })
        .catch((error: unknown) => {
          if (isDisposed) {
            return
          }

          // These browser restrictions leave the poster or current frame visible.
          if (
            error instanceof DOMException &&
            (error.name === 'NotAllowedError' || error.name === 'AbortError')
          ) {
            return
          }

          console.warn('The Hero background video could not be played.', error)
        })
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      synchronizePlayback()
    })

    observer.observe(video)
    video.addEventListener('play', synchronizePlayback)
    document.addEventListener('visibilitychange', synchronizePlayback)
    reducedMotion.addEventListener('change', synchronizePlayback)
    synchronizePlayback()

    return () => {
      isDisposed = true
      observer.disconnect()
      video.removeEventListener('play', synchronizePlayback)
      document.removeEventListener('visibilitychange', synchronizePlayback)
      reducedMotion.removeEventListener('change', synchronizePlayback)
      video.pause()
    }
  }, [videoReference])
}
