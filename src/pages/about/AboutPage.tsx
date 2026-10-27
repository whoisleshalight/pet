import styles from './AboutPage.module.scss'
import { Link } from 'react-router'
import { routePaths } from '../../app/router/routePaths'

export function AboutPage() {
  return (
    <section className={styles.aboutPage} aria-labelledby="about-title">
      <p className={styles.aboutPageLabel}>About</p>
      <h1 id="about-title">
        A thoughtful
        <br />
        approach to the web.
      </h1>
      <p className={styles.aboutPageDescription}>
        Bringing design and development together to create expressive, intuitive
        digital experiences. Care in every interaction, purpose in every detail.
      </p>
      <Link className={`textLink ${styles.aboutPageLink}`} to={routePaths.contact}>
        Let’s talk <span aria-hidden="true">↗</span>
      </Link>
    </section>
  )
}
