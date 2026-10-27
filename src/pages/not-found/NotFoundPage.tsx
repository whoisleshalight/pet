import { Link } from 'react-router'
import { routePaths } from '../../app/router/routePaths'

export function NotFoundPage() {
  return (
    <section className="content-page" aria-labelledby="not-found-title">
      <p className="eyebrow">404 — Page not found</p>
      <h1 id="not-found-title">
        A little
        <br />
        off the beaten path.
      </h1>
      <Link className="text-link content-page__link" to={routePaths.home}>
        Back to home <span aria-hidden="true">↗</span>
      </Link>
    </section>
  )
}
