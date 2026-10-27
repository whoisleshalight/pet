import { Link } from 'react-router'
import { routePaths } from '../../app/router/routePaths'

export function AboutPage() {
  return (
    <section className="content-page" aria-labelledby="about-title">
      <p className="eyebrow">About</p>
      <h1 id="about-title">
        A thoughtful
        <br />
        approach to the web.
      </h1>
      <p className="content-page__description">
        Bringing design and development together to create expressive, intuitive
        digital experiences. Care in every interaction, purpose in every detail.
      </p>
      <Link className="text-link content-page__link" to={routePaths.contact}>
        Let’s talk <span aria-hidden="true">↗</span>
      </Link>
    </section>
  )
}
