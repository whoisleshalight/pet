import { useRef } from 'react'
import type { RefObject } from 'react'
import { NavLink, useLocation } from 'react-router'
import { routePaths } from '../../../router/routePaths'
import { Container } from '../../../../components/ui/Container'
import { HeaderBrand } from './HeaderBrand'
import { HeaderIntroduction } from './HeaderIntroduction'
import { useHeaderAnimation } from './hooks/useHeaderAnimation'
import styles from './Header.module.scss'

const navigationItems = [
  { label: 'Projects', path: routePaths.projects },
  { label: 'About', path: routePaths.about },
  { label: 'News', path: routePaths.news },
  { label: 'Contact', path: routePaths.contact },
]

export type HeaderVariant = 'expanded' | 'compact'

type HeaderProps = {
  headerReference: RefObject<HTMLElement | null>
  variant?: HeaderVariant
}

export function Header({ headerReference, variant = 'compact' }: HeaderProps) {
  const { pathname } = useLocation()
  const isHeaderExpanded = variant === 'expanded'
  const containerReference = useRef<HTMLDivElement>(null)
  const navigationReference = useRef<HTMLElement>(null)
  const brandTextReference = useRef<HTMLSpanElement>(null)
  const titleReference = useRef<HTMLDivElement>(null)
  const descriptionReference = useRef<HTMLDivElement>(null)

  useHeaderAnimation({
    headerReference,
    containerReference,
    navigationReference,
    brandTextReference,
    titleReference,
    descriptionReference,
    isHeaderExpanded,
  })

  return (
    <header
      ref={headerReference}
      className={`${styles.siteHeader}${isHeaderExpanded ? ` ${styles.siteHeaderExpanded}` : ''}`}
    >
      <Container ref={containerReference} className={styles.siteHeaderContainer}>
        <HeaderBrand
          isExpanded={isHeaderExpanded}
          textReference={brandTextReference}
        />
        {isHeaderExpanded && (
          <HeaderIntroduction
            titleReference={titleReference}
            descriptionReference={descriptionReference}
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
                <NavLink
                  to={navigationItem.path}
                  className="textLink"
                  viewTransition={navigationItem.path !== pathname}
                >
                  {navigationItem.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
