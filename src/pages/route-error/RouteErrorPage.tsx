import { isRouteErrorResponse, useRouteError } from 'react-router'
import { routePaths } from '../../app/router/routePaths'

export function RouteErrorPage() {
  const routeError = useRouteError()
  const isNotFound =
    isRouteErrorResponse(routeError) && routeError.status === 404

  return (
    <main className="content-page">
      <p className="eyebrow">
        {isNotFound ? '404 — Page not found' : 'Something went wrong'}
      </p>
      <h1>{isNotFound ? 'Page not found.' : 'Let’s try that again.'}</h1>
      <p className="content-page__description">
        Please reload the page or return to the home page.
      </p>
      {/* A full navigation also recovers from a failed lazy page download. */}
      <a className="text-link content-page__link" href={routePaths.home}>
        Back to home <span aria-hidden="true">↗</span>
      </a>
    </main>
  )
}
