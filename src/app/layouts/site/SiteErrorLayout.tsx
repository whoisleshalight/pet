import './SiteLayout.scss'
import { useEffect, useRef } from 'react'
import { RouteErrorPage } from '../../../pages/route-error/RouteErrorPage'
import { Header } from './header/Header'

export function SiteErrorLayout() {
  const headerReference = useRef<HTMLElement>(null)
  const mainContentReference = useRef<HTMLElement>(null)

  useEffect(() => {
    mainContentReference.current?.focus({ preventScroll: true })
  }, [])

  return (
    <>
      <Header headerReference={headerReference} />
      <main
        className="siteMain"
        id="main-content"
        ref={mainContentReference}
        tabIndex={-1}
      >
        <RouteErrorPage />
      </main>
    </>
  )
}
