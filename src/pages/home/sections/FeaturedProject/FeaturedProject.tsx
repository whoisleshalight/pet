import { useId, useRef } from 'react'
import { Link } from 'react-router'
import { routePaths } from '../../../../app/router/routePaths'
import { Container } from '../../../../components/ui/Container'
import { Image } from '../../../../components/ui/Image'
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

  useFeaturedProjectParallax(cardReference, mediaReference)

  return (
    <Section
      className={styles.featuredProject}
      aria-labelledby={headingId}
    >
      <Container className={styles.projectContainer}>
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

        <Link
          viewTransition
          ref={cardReference}
          className={styles.projectCard}
          data-cursor-label="View"
          to={`${routePaths.projects}/golden-hour`}
          aria-label="Golden Hour — view project"
        >
          <div ref={mediaReference} className={styles.projectMedia}>
            <Image
              fill
              className={styles.projectImage}
              src={projectImage}
              srcSet={`${projectImage} 768w, ${projectImageLarge} 1536w`}
              sizes="(max-width: 660px) calc(100vw - 160px), (max-width: 1199px) calc((100vw - 160px) * 0.6667), 70vw"
              width={768}
              height={1024}
              alt="A close-up of a blue eye behind translucent, pale blue fabric."
              decoding="async"
            />
          </div>
          <div className={styles.projectCaption} aria-hidden="true">
            <span className={styles.projectName}>Golden Hour</span>
          </div>
        </Link>
		  </Container>
		  
    </Section>
  )
}
