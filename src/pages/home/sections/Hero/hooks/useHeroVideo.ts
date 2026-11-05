import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

interface HeroVideoOptions {
  sectionReference: RefObject<HTMLElement | null>
  videoReference: RefObject<HTMLVideoElement | null>
  isReelOpen: boolean
}

type PlaybackPreference = 'automatic' | 'play' | 'pause'

export function useHeroVideo({
  sectionReference,
  videoReference,
  isReelOpen,
}: HeroVideoOptions) {
  const [preference, setPreference] = useState<PlaybackPreference>('automatic')
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)

  useEffect(() => {
    const section = sectionReference.current
    const video = videoReference.current

    if (!section || !video) {
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isVisible = false
    let isDisposed = false

    function synchronizePlayback() {
      if (!video) {
        return
      }

      const shouldPlay = preference === 'play' || (
        preference === 'automatic' && !reducedMotion.matches
      )

      if (!shouldPlay || !isVisible || document.hidden || isReelOpen) {
        video.pause()
        setIsPlaying(false)
        return
      }

      void video.play().then(() => {
        if (isDisposed) {
          return
        }

        if (!isVisible || document.hidden || isReelOpen) {
          video.pause()
        }
      }).catch(() => {
        // Autoplay can be blocked; the visible play control lets the user retry.
        if (!isDisposed) {
          setIsPlaying(false)
        }
      })
    }

    function handlePlay() {
      setIsPlaying(true)
    }

    function handlePause() {
      setIsPlaying(false)
    }

    function handleError() {
      setHasVideoError(true)
      setIsPlaying(false)
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      synchronizePlayback()
    })

    observer.observe(section)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)
    document.addEventListener('visibilitychange', synchronizePlayback)
    reducedMotion.addEventListener('change', synchronizePlayback)

    return () => {
      isDisposed = true
      observer.disconnect()
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('error', handleError)
      document.removeEventListener('visibilitychange', synchronizePlayback)
      reducedMotion.removeEventListener('change', synchronizePlayback)
      video.pause()
    }
  }, [sectionReference, videoReference, preference, isReelOpen])

  function togglePlayback() {
    setPreference(isPlaying ? 'pause' : 'play')
  }

  return { isPlaying, hasVideoError, togglePlayback }
}
