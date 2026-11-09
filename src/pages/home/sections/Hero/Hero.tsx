import { useRef } from 'react'
import { Container } from '../../../../components/ui/Container'
import { Section } from '../../../../components/ui/Section'
import { useHeroAnimation } from './hooks/useHeroAnimation'
import { useHeroVideo } from './hooks/useHeroVideo'
import showreel from './assets/firma-showreel.mp4'
import showreelPoster from './assets/firma-showreel-poster.webp'
import styles from './Hero.module.scss'

export function Hero() {
  const heroReference = useRef<HTMLElement>(null)
  const backgroundVideoReference = useRef<HTMLVideoElement>(null)

  useHeroAnimation(heroReference)
  useHeroVideo(backgroundVideoReference)

  return (
    <Section ref={heroReference} className={styles.hero} aria-hidden="true">
      <Container>
        <div className={styles.showreel}>
          <span className={styles.wordmark}>
            {['first', 'second', 'third'].map((letterId) => {
              return (
                <span key={letterId} className={styles.brandLetter}>
                  W
                </span>
              )
            })}
          </span>
          <video
            ref={backgroundVideoReference}
            className={styles.backgroundVideo}
            src={showreel}
            poster={showreelPoster}
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            tabIndex={-1}
          />
        </div>
      </Container>
    </Section>
  )
}
