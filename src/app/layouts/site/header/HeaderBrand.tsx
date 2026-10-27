import styles from './HeaderBrand.module.scss'
import { useRef } from 'react'
import type { MouseEvent, RefObject } from 'react'
import { Link } from 'react-router'
import { routePaths } from '../../../router/routePaths'
import { portfolio } from '../../../../config/portfolio'
import { scrollToTop } from '../../../../lib/scroll'
import { useGSAP } from '../../../../lib/animation'
import { getAnimatedLetters } from './getAnimatedLetters'

type HeaderBrandProps = {
  isExpanded: boolean
  textReference: RefObject<HTMLSpanElement | null>
}

export function HeaderBrand({ isExpanded, textReference }: HeaderBrandProps) {
  const brandReference = useRef<HTMLAnchorElement>(null)
  const { contextSafe } = useGSAP({ scope: brandReference })

  const handleHomeClick = contextSafe((event: MouseEvent<HTMLAnchorElement>) => {
    if (
      !isExpanded ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return

    event.preventDefault()
    scrollToTop()
  })

  return (
    <Link
      ref={brandReference}
      className={`${styles.siteHeaderBrand}${isExpanded ? ` ${styles.siteHeaderBrandExpanded}` : ''}`}
      to={routePaths.home}
      onClick={handleHomeClick}
      aria-label="Home"
    >
      <span
        ref={textReference}
        className={styles.siteHeaderBrandText}
        aria-hidden="true"
      >
        {getAnimatedLetters(portfolio.shortName).map((letter, letterIndex) => (
          <span className={styles.siteHeaderBrandLetter} key={letterIndex}>
            <span className={styles.siteHeaderBrandLetterContent}>{letter}</span>
          </span>
        ))}
      </span>
    </Link>
  )
}
