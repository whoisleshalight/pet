import { useId } from 'react'
import { Link } from 'react-router'
import { routePaths } from '../../app/router/routePaths'
import './ErrorScreen.css'

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
    <section
      className="error-screen"
      aria-labelledby={titleIdentifier}
      aria-describedby={messageIdentifier}
    >
      <div className="error-screen__content">
        <h1 className="error-screen__status-code" id={titleIdentifier}>
          {statusCode}
        </h1>
        <p id={messageIdentifier}>{message}</p>
        <div>
          <Link
            className="error-screen__home-link"
            to={routePaths.home}
            reloadDocument={reloadDocument}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
