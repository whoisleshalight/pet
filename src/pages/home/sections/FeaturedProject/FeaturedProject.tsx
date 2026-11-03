import { useId, useRef, useState } from 'react'
import { Section } from '../../../../components/ui/Section'
import { useFeaturedProjectParallax } from './hooks/useFeaturedProjectParallax'
import projectImage from './assets/B4jxrHJqCYeKMdfyNVrqx2Gp4.avif'
import projectImageLarge from './assets/B4jxrHJqCYeKMdfyNVrqx2Gp4.avif'
import styles from './FeaturedProject.module.scss'

const tickerCopies = ['first', 'second', 'third']
const tickerGroups = ['original', 'duplicate']

export function FeaturedProject() {
  const headingId = useId()
  const cardReference = useRef<HTMLAnchorElement>(null)
  const mediaReference = useRef<HTMLDivElement>(null)
  const [isMotionPaused, setIsMotionPaused] = useState(false)
  const sectionClassName = isMotionPaused
    ? `${styles.featuredProject} ${styles.motionPaused}`
    : styles.featuredProject

  useFeaturedProjectParallax(cardReference, mediaReference)

  function handleMotionToggle() {
    setIsMotionPaused((wasPaused) => !wasPaused)
  }

  return (
    <Section
      className={sectionClassName}
      containerClassName={styles.projectContainer}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className={styles.accessibleTitle}>
        Featured Project
      </h2>

      <div className={styles.tickers} aria-hidden="true">
        {['muted', 'dark'].map((tone) => {
          return (
            <div
              key={tone}
              className={`${styles.tickerRow} ${styles[tone]}`}
            >
              <div className={styles.tickerTrack}>
                {tickerGroups.map((group) => {
                  return (
                    <div key={group} className={styles.tickerGroup}>
                      {tickerCopies.map((copy) => {
                        return (
                          <span key={copy} className={styles.tickerText}>
                            Featured Project.&nbsp;
                          </span>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <a
        ref={cardReference}
        className={styles.projectCard}
        href="https://mobius.framer.website/work/golden-hour"
        aria-label="Golden Hour — view project on Möbius"
      >
        <div ref={mediaReference} className={styles.projectMedia}>
          <img
            className={styles.projectImage}
            src={projectImage}
            srcSet={`${projectImage} 768w, ${projectImageLarge} 1536w`}
            sizes="(max-width: 660px) calc(100vw - 40px), (max-width: 1199px) calc((100vw - 80px) * 0.6667), calc((100vw - 160px) / 3)"
            width={768}
            height={1024}
            alt="A close-up of a blue eye behind translucent, pale blue fabric."
            decoding="async"
          />
        </div>
        <div className={styles.projectCaption} aria-hidden="true">
          <span className={styles.projectName}>Golden Hour</span>
        </div>
      </a>

      <button
        className={styles.motionButton}
        type="button"
        onClick={handleMotionToggle}
        aria-pressed={isMotionPaused}
        aria-label="Pause moving text"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {isMotionPaused ? (
            <path d="M8 5v14l11-7z" />
          ) : (
            <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
          )}
        </svg>
      </button>
    </Section>
  )
}
