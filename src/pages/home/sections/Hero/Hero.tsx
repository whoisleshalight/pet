import { useId, useRef, useState } from 'react'
import { Section } from '../../../../components/ui/Section'
import { useHeroAnimation } from './hooks/useHeroAnimation'
import { useHeroVideo } from './hooks/useHeroVideo'
import showreel from './assets/firma-showreel.mp4'
import showreelPoster from './assets/firma-showreel-poster.webp'
import styles from './Hero.module.scss'

const creativeWords = [
  { text: 'ideas', color: '#ff7a6e' },
  { text: 'brands', color: '#20c983' },
  { text: 'products', color: '#ff87ad' },
  { text: 'design', color: '#6b53e0' },
  { text: 'things', color: '#000000' },
]

export function Hero() {
  const headingId = useId()
  const dialogHeadingId = useId()
  const sectionReference = useRef<HTMLElement>(null)
  const backgroundVideoReference = useRef<HTMLVideoElement>(null)
  const dialogReference = useRef<HTMLDialogElement>(null)
  const reelVideoReference = useRef<HTMLVideoElement>(null)
  const [isReelOpen, setIsReelOpen] = useState(false)
  const [hasReelError, setHasReelError] = useState(false)

  useHeroAnimation(sectionReference)

  const { isPlaying, hasVideoError, togglePlayback } = useHeroVideo({
    sectionReference,
    videoReference: backgroundVideoReference,
    isReelOpen,
  })

  function handleOpenReel() {
    const dialog = dialogReference.current

    if (!dialog) {
      return
    }

    dialog.showModal()
    setIsReelOpen(true)
    setHasReelError(false)

    const video = reelVideoReference.current

    if (video) {
      video.currentTime = 0
      void video.play().catch(() => {
        // Native controls remain available if the browser blocks playback.
        video.controls = true
      })
    }
  }

  function handleCloseReel() {
    dialogReference.current?.close()
  }

  function handleReelClosed() {
    reelVideoReference.current?.pause()
    setIsReelOpen(false)
  }

  return (
    <Section
      ref={sectionReference}
      className={styles.hero}
      aria-labelledby={headingId}
    >
      <div className={styles.introduction}>
        <h2
          id={headingId}
          className={styles.title}
          aria-label="Let's create things together."
        >
          <span className={styles.titleLead} aria-hidden="true">
            Let’s create
          </span>
          <span className={styles.rotatingWords} aria-hidden="true">
            {creativeWords.map((word) => {
              return (
                <span
                  key={word.text}
                  className={styles.rotatingWord}
                  style={{ color: word.color }}
                >
                  {word.text}
                </span>
              )
            })}
          </span>
        </h2>

        <div className={styles.message}>
          <p className={styles.together} aria-hidden="true">
            together.
          </p>
          <p className={styles.description}>
            We help businesses find their voice, shape their identity,
            and connect with their audience.{' '}
            <strong className={styles.descriptionEmphasis}>
              Less talk. More craft.
            </strong>
          </p>
        </div>
      </div>

      <button
        className={styles.reelButton}
        type="button"
        onClick={handleOpenReel}
        aria-label="Play showreel"
        aria-haspopup="dialog"
      >
        <span className={styles.reelLabel}>Play reel</span>
        <span className={styles.wordmark} aria-hidden="true">
          {['first', 'second', 'third'].map((letterId) => {
            return (
              <span key={letterId} className={styles.brandLetter}>
                W
              </span>
            )
          })}
        </span>
        <span className={styles.videoLayer} aria-hidden="true">
          <video
            ref={backgroundVideoReference}
            className={styles.backgroundVideo}
            src={showreel}
            poster={showreelPoster}
            preload="none"
            muted
            loop
            playsInline
            disablePictureInPicture
          />
        </span>
      </button>

      <button
        className={styles.playbackControl}
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        disabled={hasVideoError}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          {isPlaying ? (
            <path d="M4 2h3v12H4zm5 0h3v12H9z" fill="currentColor" />
          ) : (
            <path d="m4 2 10 6-10 6z" fill="currentColor" />
          )}
        </svg>
      </button>

      {hasVideoError && (
        <p className={styles.videoError} role="status">
          The showreel could not be loaded.
        </p>
      )}

      <dialog
        ref={dialogReference}
        className={styles.reelDialog}
        aria-labelledby={dialogHeadingId}
        onClose={handleReelClosed}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            handleCloseReel()
          }
        }}
      >
        <div className={styles.dialogContent}>
          <h3 id={dialogHeadingId} className={styles.accessibleTitle}>
            Showreel
          </h3>
          <button
            className={styles.closeButton}
            type="button"
            onClick={handleCloseReel}
            autoFocus
          >
            Close
            <span aria-hidden="true">×</span>
          </button>
          <video
            ref={reelVideoReference}
            className={styles.reelVideo}
            src={showreel}
            poster={showreelPoster}
            preload="none"
            controls
            playsInline
            onError={() => setHasReelError(true)}
          />
          {hasReelError && (
            <p className={styles.reelError} role="status">
              The showreel could not be loaded. Please try again later.
            </p>
          )}
        </div>
      </dialog>
    </Section>
  )
}
