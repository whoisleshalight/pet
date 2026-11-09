import { useId } from 'react'
import { Link } from 'react-router'
import { routePaths } from '../../app/router/routePaths'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import styles from './ErrorScreen.module.scss'

type ErrorScreenProps = {
  statusCode: number
  message: string
  reloadDocument?: boolean
}

export function ErrorScreen({
  statusCode,
  message,
  reloadDocument = false,
}: ErrorScreenProps) {
  const titleIdentifier = useId()
  const messageIdentifier = useId()

  return (
    <Section
      className={styles.errorScreen}
      aria-labelledby={titleIdentifier}
      aria-describedby={messageIdentifier}
    >
      <Container className={styles.errorScreenContent}>
        <h1 className={styles.errorScreenStatusCode} id={titleIdentifier}>
          {statusCode}
        </h1>
        <p id={messageIdentifier}>{message}</p>
        <div>
          <Link
            className={styles.errorScreenHomeLink}
            to={routePaths.home}
            reloadDocument={reloadDocument}
            viewTransition={!reloadDocument}
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </Section>
  )
}
