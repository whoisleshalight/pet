import { Fragment, useId, useRef } from 'react'
import { routePaths } from '../../../../app/router/routePaths'
import { ArrowLink } from '../../../../components/ui/ArrowLink'
import { Container } from '../../../../components/ui/Container'
import { Section } from '../../../../components/ui/Section'
import { useServicesAnimation } from './hooks/useServicesAnimation'
import { serviceItems } from './serviceItems'
import styles from './Services.module.scss'

interface ServiceWordsProps {
  text: string
}

function ServiceWords({ text }: ServiceWordsProps) {
  return text.split(' ').map((word, wordIndex) => {
    return (
      <Fragment key={`${word}-${wordIndex}`}>
        {wordIndex > 0 && ' '}
        <span className={styles.wordMask}>
          <span className={styles.word}>{word}</span>
        </span>
      </Fragment>
    )
  })
}

export function Services() {
  const headingId = useId()
  const sectionReference = useRef<HTMLElement>(null)

  useServicesAnimation(sectionReference)

  return (
    <Section
      ref={sectionReference}
      className={styles.services}
      aria-labelledby={headingId}
    >
      <Container className={styles.layout}>
        <div className={styles.introduction}>
          <div className={styles.headingContainer}>
            <h2
              id={headingId}
              className={styles.title}
              aria-label="Our Services"
            >
              {['Our', 'Services'].map((word, wordIndex) => {
                return (
                  <Fragment key={word}>
                    {wordIndex > 0 && ' '}
                    <span className={styles.titleWord} aria-hidden="true">
                      {Array.from(word).map((letter, letterIndex) => {
                        return (
                          <span
                            key={`${word}-${letterIndex}`}
                            className={styles.titleLetter}
                          >
                            {letter}
                          </span>
                        )
                      })}
                    </span>
                  </Fragment>
                )
              })}
            </h2>
          </div>

          <p className={styles.introductionCopy}>
            <ServiceWords text="If you’re looking for clarity in design, let’s build it together." />
          </p>

          <ArrowLink className={styles.contactLink} to={routePaths.contact}>
            Get Started
          </ArrowLink>
        </div>

        <ol className={styles.serviceList}>
          {serviceItems.map((service) => {
            return (
              <li key={service.id} className={styles.service}>
                <span className={styles.serviceIndex} aria-hidden="true">
                  <span className={styles.indexText}>{service.index} /</span>
                </span>

                <div className={styles.serviceBody}>
                  <h3 className={styles.description}>
                    <ServiceWords text={service.description} />
                  </h3>

                  <ul className={styles.capabilities}>
                    {service.capabilities.map((capability) => {
                      return (
                        <li key={capability} className={styles.capability}>
                          {capability}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>
      </Container>
    </Section>
  )
}
