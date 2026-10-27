import './AboutPage.scss'
import { Link } from 'react-router'
import { routePaths } from '../../app/router/routePaths'

export function AboutPage() {
  return (
    <section className="aboutPage" aria-labelledby="about-title">
      <p className="aboutPageLabel">About</p>
      <h1 id="about-title">
        A thoughtful
        <br />
        approach to the web.
      </h1>
      <p className="aboutPageDescription">
        Bringing design and development together to create expressive, intuitive
        digital experiences. Care in every interaction, purpose in every detail.
      </p>
      <Link className="textLink aboutPageLink" to={routePaths.contact}>
        Let’s talk <span aria-hidden="true">↗</span>
      </Link>
    </section>
  )
}
