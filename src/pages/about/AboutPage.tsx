import { Link } from 'react-router'
import { routePaths } from '../../app/router/routePaths'
import { Container } from '../../components/ui/Container'
import { Section } from '../../components/ui/Section'
import styles from './AboutPage.module.scss'

export function AboutPage() {
  return (
    <Section className={styles.aboutPage} aria-labelledby="about-title">
      <Container>
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
        <Link
          className={`textLink ${styles.aboutPageLink}`}
          to={routePaths.contact}
          viewTransition
        >
          Let’s talk <span aria-hidden="true">↗</span>
        </Link>
      </Container>
    </Section>
  )
}
