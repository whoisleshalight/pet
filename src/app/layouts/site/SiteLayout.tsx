import './SiteLayout.scss'
import { useEffect, useRef } from 'react'
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useMatches,
} from 'react-router'
import { portfolio } from '../../../config/portfolio'
import { Scrollbar } from '../../../components/scrollbar/Scrollbar'
import { Header } from './header/Header'
import type { HeaderVariant } from './header/Header'
import { SmoothScroll } from './scroll/SmoothScroll'

export function SiteLayout() {
  const location = useLocation()
  const matches = useMatches()
  const headerReference = useRef<HTMLElement>(null)
  const mainContentReference = useRef<HTMLElement>(null)
  const previousPathnameReference = useRef(location.pathname)
  const currentPage = matches.at(-1)?.handle as
    | {
        title?: string
        headerVariant?: HeaderVariant
      }
    | undefined
  const pageTitle = currentPage?.title ?? 'Portfolio'
  const headerVariant = currentPage?.headerVariant ?? 'compact'

  useEffect(() => {
    document.title = `${pageTitle} — ${portfolio.firstName} ${portfolio.lastName}`
  }, [pageTitle])

  useEffect(() => {
    if (previousPathnameReference.current !== location.pathname) {
      mainContentReference.current?.focus({ preventScroll: true })
      previousPathnameReference.current = location.pathname
    }
  }, [location.pathname])

  return (
    <>
      <Header headerReference={headerReference} variant={headerVariant} />
      <SmoothScroll
        contentReference={mainContentReference}
        navigationKey={location.key}
      >
        <main
          className="siteMain"
          id="main-content"
          ref={mainContentReference}
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </SmoothScroll>
      <Scrollbar
        contentReference={mainContentReference}
        navigationKey={location.key}
        controlsId="main-content"
      />
      <ScrollRestoration />
    </>
  )
}
