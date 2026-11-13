import { useRef } from 'react'
import { Container } from '../../../../components/ui/Container'
import { Image } from '../../../../components/ui/Image'
import { Section } from '../../../../components/ui/Section'
import { portfolio } from '../../../../config/portfolio'
import { useContactDetailsAnimation } from './hooks/useContactDetailsAnimation'
import studioExteriorLarge from './assets/studio-exterior-1920.webp'
import studioExteriorSmall from './assets/studio-exterior-960.webp'
import styles from './ContactDetails.module.scss'

export function ContactDetails() {
  const sectionReference = useRef<HTMLElement>(null)
  const imageReference = useRef<HTMLImageElement>(null)
  const cardReference = useRef<HTMLDivElement>(null)

  useContactDetailsAnimation(sectionReference, imageReference, cardReference)

  return (
    <Section ref={sectionReference}>
		  <Container>
			  <h1 className={styles.title}>Let's Connect</h1>
        <div className={styles.scene}>
          <Image
            frameClassName={styles.imageFrame}
            ref={imageReference}
            className={styles.image}
            src={studioExteriorLarge}
            srcSet={`${studioExteriorSmall} 960w, ${studioExteriorLarge} 1920w`}
            sizes="calc(100vw - 160px)"
            width={1920}
            height={1446}
            alt="Sunlit studio building with tall windows, trees, and cyclists passing by."
            fetchPriority="high"
            priority
            decoding="async"
          />

          <div ref={cardReference} className={styles.contactCard}>
            <dl className={styles.contactList}>
              <div className={styles.contactGroup}>
                <dt className={styles.label}>Email</dt>
                <dd className={styles.value}>
                  <a
                    className={styles.emailLink}
                    href={`mailto:${portfolio.emailAddress}`}
                  >
                    {portfolio.emailAddress}
                  </a>
                </dd>
              </div>

              <div className={styles.contactGroup}>
                <dt className={styles.label}>Phone</dt>
                <dd className={styles.value}>+38 (000) 000 00 00</dd>
              </div>

              <div className={styles.contactGroup}>
                <dt className={styles.label}>Address</dt>
                <dd className={styles.value}>
                  <address className={styles.address}>
                    <span>Your studio name</span>
                    <span>Street name, 00</span>
                    <span>City, Country</span>
                  </address>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  )
}
