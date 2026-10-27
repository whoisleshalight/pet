import { Link } from 'react-router'
import { routePaths } from '../../app/router/routePaths'
import { HomeIntro } from '../../components/home-intro/HomeIntro'
import './HomePage.css'

export function HomePage() {
  return (
    <>
      <HomeIntro />
      <section className="home-contact" aria-labelledby="home-contact-title">
        <p className="eyebrow">Have a project in mind?</p>
        <h2 id="home-contact-title">
          Let’s build
          <br />
          something unique.
        </h2>
        <Link className="text-link" to={routePaths.contact}>
          Get in touch <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  )
}
