import { useEffect, useRef } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router'
import { ErrorScreen } from '../../components/error-screen/ErrorScreen'
import { Header } from '../../components/header/Header'
import { portfolio } from '../../config/portfolio'

export function RouteErrorPage() {
  const routeError = useRouteError()
  const mainContentReference = useRef<HTMLElement>(null)
  const statusCode = isRouteErrorResponse(routeError) ? routeError.status : 500
  const message =
    statusCode === 404
      ? 'This page does not exist'
      : 'This page could not be loaded. Please try again.'

  useEffect(() => {
    document.title = `${statusCode} — ${portfolio.firstName} ${portfolio.lastName}`
    mainContentReference.current?.focus({ preventScroll: true })
  }, [statusCode])

  return (
    <>
      <Header forceCompact />
      <main id="main-content" ref={mainContentReference} tabIndex={-1}>
        {/* Reloading also recovers from a failed lazy page download. */}
        <ErrorScreen statusCode={statusCode} message={message} reloadDocument />
      </main>
    </>
  )
}
