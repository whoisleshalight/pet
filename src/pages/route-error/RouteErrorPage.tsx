import { useEffect } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router'
import { ErrorScreen } from '../../components/error-screen/ErrorScreen'
import { portfolio } from '../../config/portfolio'

export function RouteErrorPage() {
  const routeError = useRouteError()
  const statusCode = isRouteErrorResponse(routeError) ? routeError.status : 500
  const message =
    statusCode === 404
      ? 'This page does not exist'
      : 'This page could not be loaded. Please try again.'

  useEffect(() => {
    document.title = `${statusCode} — ${portfolio.firstName} ${portfolio.lastName}`
  }, [statusCode])

  return (
    <ErrorScreen statusCode={statusCode} message={message} reloadDocument />
  )
}
