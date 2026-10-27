import { ErrorScreen } from '../../components/error-screen/ErrorScreen'

export function NotFoundPage() {
  return <ErrorScreen statusCode={404} message="This page does not exist" />
}
