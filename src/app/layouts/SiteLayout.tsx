import { useEffect, useRef } from 'react'
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useMatches,
} from 'react-router'
import { Header } from '../../components/header/Header'
import { portfolio } from '../../config/portfolio'
import { SmoothScroll } from '../scroll/SmoothScroll'

export function SiteLayout() {
  const location = useLocation()
  const matches = useMatches()
  const mainContentReference = useRef<HTMLElement>(null)
  const previousPathnameReference = useRef(location.pathname)
  const currentPage = matches.at(-1)?.handle as { title?: string } | undefined
  const pageTitle = currentPage?.title ?? 'Portfolio'

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
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <SmoothScroll contentReference={mainContentReference}>
        <Outlet />
      </SmoothScroll>
      <ScrollRestoration />
    </>
  )
}
