import './HeaderBrand.scss'
import type { MouseEvent } from 'react'
import { Link } from 'react-router'
import { routePaths } from '../../../router/routePaths'
import { portfolio } from '../../../../config/portfolio'
import { scrollToTop } from '../../../../lib/scroll'
import { getAnimatedLetters } from './getAnimatedLetters'

type HeaderBrandProps = {
  isExpanded: boolean
}

export function HeaderBrand({ isExpanded }: HeaderBrandProps) {
  function handleHomeClick(event: MouseEvent<HTMLAnchorElement>) {
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
  }

  return (
    <Link
      className="siteHeaderBrand"
      to={routePaths.home}
      onClick={handleHomeClick}
      aria-label="Home"
    >
      <span className="siteHeaderBrandText" aria-hidden="true">
        {getAnimatedLetters(portfolio.shortName).map((letter, letterIndex) => (
          <span className="siteHeaderBrandLetter" key={letterIndex}>
            <span className="siteHeaderBrandLetterContent">{letter}</span>
          </span>
        ))}
      </span>
    </Link>
  )
}
