import './Header.scss'
import type { RefObject } from 'react'
import { NavLink } from 'react-router'
import { routePaths } from '../../../router/routePaths'
import { HeaderBrand } from './HeaderBrand'
import { HeaderIntroduction } from './HeaderIntroduction'
import { useHeaderAnimation } from './useHeaderAnimation'

const navigationItems = [
  { label: 'About', path: routePaths.about },
  { label: 'Contact', path: routePaths.contact },
]

export type HeaderVariant = 'expanded' | 'compact'

type HeaderProps = {
  headerReference: RefObject<HTMLElement | null>
  variant?: HeaderVariant
}

export function Header({ headerReference, variant = 'compact' }: HeaderProps) {
  const isHeaderExpanded = variant === 'expanded'

  useHeaderAnimation(headerReference, isHeaderExpanded)

  return (
    <header
      ref={headerReference}
      className={`siteHeader${isHeaderExpanded ? ' siteHeaderExpanded' : ''}`}
    >
      <HeaderBrand isExpanded={isHeaderExpanded} />
      {isHeaderExpanded && <HeaderIntroduction />}
      <nav className="siteHeaderNavigation" aria-label="Main navigation">
        <ul className="siteHeaderLinks">
          {navigationItems.map((navigationItem) => (
            <li key={navigationItem.path}>
              <NavLink to={navigationItem.path} className="textLink">
                {navigationItem.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
