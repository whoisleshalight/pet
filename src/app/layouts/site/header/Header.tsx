import styles from './Header.module.scss'
import { useRef } from 'react'
import type { RefObject } from 'react'
import { NavLink } from 'react-router'
import { routePaths } from '../../../router/routePaths'
import { HeaderBrand } from './HeaderBrand'
import { HeaderIntroduction } from './HeaderIntroduction'
import { useHeaderAnimation } from './hooks/useHeaderAnimation'

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
  const navigationReference = useRef<HTMLElement>(null)
  const brandTextReference = useRef<HTMLSpanElement>(null)
  const titleReference = useRef<HTMLDivElement>(null)
  const descriptionReference = useRef<HTMLDivElement>(null)
  const availabilityReference = useRef<HTMLDivElement>(null)

  useHeaderAnimation({
    headerReference,
    navigationReference,
    brandTextReference,
    titleReference,
    descriptionReference,
    availabilityReference,
    isHeaderExpanded,
  })

  return (
    <header
      ref={headerReference}
      className={`${styles.siteHeader}${isHeaderExpanded ? ` ${styles.siteHeaderExpanded}` : ''}`}
    >
      <HeaderBrand
        isExpanded={isHeaderExpanded}
        textReference={brandTextReference}
      />
      {isHeaderExpanded && (
        <HeaderIntroduction
          titleReference={titleReference}
          descriptionReference={descriptionReference}
          availabilityReference={availabilityReference}
        />
      )}
      <nav
        ref={navigationReference}
        className={styles.siteHeaderNavigation}
        aria-label="Main navigation"
      >
        <ul className={styles.siteHeaderLinks}>
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
