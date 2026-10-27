import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { Link, NavLink, useMatch } from 'react-router'
import { routePaths } from '../../app/router/routePaths'
import { portfolio } from '../../config/portfolio'
import { scrollToTop } from '../../lib/scroll'
import { useHeaderAnimation } from './useHeaderAnimation'
import './Header.css'

const navigationItems = [
  { label: 'About', path: routePaths.about },
  { label: 'Contact', path: routePaths.contact },
]

type HeaderProps = {
  forceCompact?: boolean
}

export function Header({ forceCompact = false }: HeaderProps) {
  const headerReference = useRef<HTMLElement>(null)
  const isHomePage = useMatch(routePaths.home) !== null && !forceCompact

  useHeaderAnimation(headerReference, isHomePage)

  function handleHomeClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      !isHomePage ||
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
    <header
      ref={headerReference}
      className={`site-header${isHomePage ? ' site-header--home' : ''}`}
    >
      <Link
        className="site-header__brand"
        to={routePaths.home}
        onClick={handleHomeClick}
        aria-label="Home"
      >
        <span className="site-header__brand-text">{portfolio.shortName}</span>
      </Link>
      <nav className="site-header__navigation" aria-label="Main navigation">
        <ul className="site-header__links">
          {navigationItems.map((navigationItem) => (
            <li key={navigationItem.path}>
              <NavLink to={navigationItem.path} className="text-link">
                {navigationItem.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
