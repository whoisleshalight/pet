import styles from './HeaderIntroduction.module.scss'
import type { RefObject } from 'react'
import { Link } from 'react-router'
import { routePaths } from '../../../router/routePaths'
import { portfolio } from '../../../../config/portfolio'
import { getAnimatedLetters } from './getAnimatedLetters'

type HeaderIntroductionProps = {
  titleReference: RefObject<HTMLDivElement | null>
  descriptionReference: RefObject<HTMLDivElement | null>
  availabilityReference: RefObject<HTMLDivElement | null>
}

export function HeaderIntroduction({
  titleReference,
  descriptionReference,
  availabilityReference,
}: HeaderIntroductionProps) {
  return (
    <>
      <div ref={titleReference} className={styles.siteHeaderTitle}>
        <h1
          className={styles.siteHeaderName}
          aria-label={`${portfolio.firstName} ${portfolio.lastName}`}
        >
          {[portfolio.firstName, portfolio.lastName].map((name, nameIndex) => (
            <span
              className={styles.siteHeaderWordMask}
              key={nameIndex}
              aria-hidden="true"
            >
              <span className={styles.siteHeaderWord}>
                {getAnimatedLetters(name).map((letter, letterIndex) => (
                  <span className={styles.siteHeaderLetter} key={letterIndex}>
                    <span className={styles.siteHeaderLetterContent}>
                      <span className={styles.siteHeaderLetterReveal}>{letter}</span>
                    </span>
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h1>
      </div>
      <div ref={descriptionReference} className={styles.siteHeaderDescription}>
        <p className={styles.siteHeaderDescriptionContent}>
          <span>{portfolio.role}</span>
          {portfolio.introduction.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
      <div ref={availabilityReference} className={styles.siteHeaderAvailability}>
        <Link className={styles.siteHeaderAvailabilityLink} to={routePaths.contact}>
          {portfolio.availability}
          <span className={styles.siteHeaderAvailabilityDot} aria-hidden="true" />
        </Link>
      </div>
    </>
  )
}
