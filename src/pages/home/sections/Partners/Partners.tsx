import { useId, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Section } from '../../../../components/ui/Section'
import { usePartnersAnimation } from './hooks/usePartnersAnimation'
import { partners } from './partnerData'
import teamImage from './assets/partners-team-1920.webp'
import teamImageSmall from './assets/partners-team-960.webp'
import styles from './Partners.module.scss'

interface PartnerLogoStyle extends CSSProperties {
  '--logo-size': string
  '--logo-mobile-size': string
}

export function Partners() {
  const headingId = useId()
  const sectionReference = useRef<HTMLElement>(null)

  usePartnersAnimation(sectionReference)

  return (
    <Section
      ref={sectionReference}
      className={styles.partners}
      aria-labelledby={headingId}
    >
      <div className={styles.sequence}>
        <div className={styles.introduction}>
          <h2 id={headingId} className={styles.title}>
            Our Partners
          </h2>
          <p className={styles.description}>
            Here are some of the brands we’ve had the privilege to collaborate
            with.
          </p>
        </div>

        <div className={styles.logoStage}>
          <ul className={styles.logoGrid} aria-label="Our partners">
            {partners.map((partner) => {
              const logoStyle: PartnerLogoStyle = {
                '--logo-size': `${partner.size}%`,
                '--logo-mobile-size': `${partner.mobileSize}%`,
              }

              return (
                <li
                  key={partner.id}
                  className={styles.logoCell}
                  style={logoStyle}
                >
                  <div className={styles.logoViewport}>
                    <img
                      className={styles.logo}
                      src={partner.image}
                      alt={partner.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <figure className={styles.imageFrame}>
        <img
          className={styles.teamImage}
          src={teamImage}
          srcSet={`${teamImageSmall} 960w, ${teamImage} 1920w`}
          sizes="calc(100vw - 160px)"
          width={1920}
          height={1446}
          alt="A team discussing a project together in a sunlit studio."
          loading="lazy"
          decoding="async"
        />
      </figure>
    </Section>
  )
}
