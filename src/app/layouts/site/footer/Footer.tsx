import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { NavLink, useLocation } from 'react-router'
import { Container } from '../../../../components/ui/Container'
import { portfolio } from '../../../../config/portfolio'
import { scrollToTop } from '../../../../lib/scroll'
import { routePaths } from '../../../router/routePaths'
import { useFooterAnimation } from './hooks/useFooterAnimation'
import styles from './Footer.module.scss'

const currentYear = new Date().getFullYear()
const navigationLinks = [
  { label: 'Home', path: routePaths.home },
  { label: 'About', path: routePaths.about },
  { label: 'Contact', path: routePaths.contact },
]
const socialLinks = ['Upwork', 'Fiverr', 'WhatsApp', 'Telegram']
const legalLinks = ['Privacy Policy', 'Terms of Service']
const brandBlinds = Array.from({ length: 6 }, (_, index) => index)

function preventPlaceholderNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
}

export function Footer() {
  const footerReference = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const { contextSafe } = useFooterAnimation(footerReference, pathname)

  const handleHomeClick = contextSafe((event: MouseEvent<HTMLAnchorElement>) => {
    if (
      pathname !== routePaths.home ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    scrollToTop()
  })

  return (
    <footer ref={footerReference} className={styles.footer}>
      <Container className={styles.footerContainer}>
        <div className={styles.masthead}>
          <div className={styles.brand}>
            <span className={styles.brandText}>
              {portfolio.shortName}
            </span>
            <span className={styles.brandCurtain} aria-hidden="true">
              {brandBlinds.map((blind) => {
                return <span key={blind} className={styles.brandBlind} />
              })}
            </span>
          </div>
          <p className={styles.year}>© {currentYear}</p>
        </div>

        <div className={styles.columns}>
          <nav className={styles.linkGroup} aria-label="Footer navigation">
            <h2 className={styles.groupTitle}>Navigation</h2>
            <ul className={styles.linkList}>
              {navigationLinks.map((navigationLink) => {
                return (
                  <li key={navigationLink.path}>
                    <NavLink
                      to={navigationLink.path}
                      className={styles.footerLink}
                      end={navigationLink.path === routePaths.home}
                      onClick={
                        navigationLink.path === routePaths.home
                          ? handleHomeClick
                          : undefined
                      }
                    >
                      {navigationLink.label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          <nav className={styles.linkGroup} aria-label="Social links">
            <h2 className={styles.groupTitle}>Social</h2>
            <ul className={styles.linkList}>
              {socialLinks.map((label) => {
                return (
                  <li key={label}>
                    <a
                      href="#"
                      className={styles.footerLink}
                      aria-disabled="true"
                      onClick={preventPlaceholderNavigation}
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <nav className={styles.linkGroup} aria-label="Legal links">
            <h2 className={styles.groupTitle}>Legal</h2>
            <ul className={styles.linkList}>
              {legalLinks.map((label) => {
                return (
                  <li key={label}>
                    <a
                      href="#"
                      className={styles.footerLink}
                      aria-disabled="true"
                      onClick={preventPlaceholderNavigation}
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} {portfolio.shortName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
