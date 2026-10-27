import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import { RouterProvider } from 'react-router/dom'
import { applicationRouter } from './app/router/applicationRouter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={applicationRouter} />
  </StrictMode>,
)
