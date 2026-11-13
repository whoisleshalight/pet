import { useId, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Container } from '../../../../components/ui/Container'
import { Image } from '../../../../components/ui/Image'
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
      <Container>
        <div className={styles.sequence}>
          <div className={styles.introduction}>
            <h2 id={headingId} className={styles.title}>
              Our Partners
            </h2>
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
                      <Image
                        fill
                        frameClassName={styles.logoFrame}
                        className={styles.logo}
                        src={partner.image}
                        alt={partner.name}
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
          <Image
            fill
            className={styles.teamImage}
            src={teamImage}
            srcSet={`${teamImageSmall} 960w, ${teamImage} 1920w`}
            sizes="calc(100vw - 160px)"
            width={1920}
            height={1446}
            alt="A team discussing a project together in a sunlit studio."
            decoding="async"
          />
        </figure>
      </Container>
    </Section>
  )
}
