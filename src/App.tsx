import { RouterProvider } from 'react-router/dom'
import { applicationRouter } from './app/router/applicationRouter'

export default function App() {
  return <RouterProvider router={applicationRouter} />
}
