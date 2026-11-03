import { useRef } from 'react'
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
    <section
      ref={sectionReference}
      className={styles.contactDetails}
      aria-labelledby="contact-title"
    >
      <h1 id="contact-title" className={styles.visuallyHidden}>
        Let’s talk. Get in touch.
      </h1>

      <div className={styles.scene}>
        <div className={styles.imageFrame}>
          <img
            ref={imageReference}
            className={styles.image}
            src={studioExteriorLarge}
            srcSet={`${studioExteriorSmall} 960w, ${studioExteriorLarge} 1920w`}
            sizes="(max-width: 660px) calc(100vw - 40px), calc(100vw - 80px)"
            width={1920}
            height={1446}
            alt="Sunlit studio building with tall windows, trees, and cyclists passing by."
            fetchPriority="high"
            decoding="async"
          />
        </div>

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
    </section>
  )
}
