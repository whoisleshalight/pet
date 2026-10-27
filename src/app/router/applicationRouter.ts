import { createBrowserRouter } from 'react-router'
import { SiteLayout } from '../layouts/SiteLayout'
import { RouteErrorPage } from '../../pages/route-error/RouteErrorPage'
import { routePaths } from './routePaths'

// The layout persists between pages. Each page loads its JavaScript on demand.
export const applicationRouter = createBrowserRouter([
  {
    Component: SiteLayout,
    ErrorBoundary: RouteErrorPage,
    children: [
      {
        index: true,
        handle: { title: 'Home' },
        lazy: async () => {
          const { HomePage } = await import('../../pages/home/HomePage')
          return { Component: HomePage }
        },
      },
      {
        path: routePaths.about,
        handle: { title: 'About' },
        lazy: async () => {
          const { AboutPage } = await import('../../pages/about/AboutPage')
          return { Component: AboutPage }
        },
      },
      {
        path: routePaths.contact,
        handle: { title: 'Contact' },
        lazy: async () => {
          const { ContactPage } =
            await import('../../pages/contact/ContactPage')
          return { Component: ContactPage }
        },
      },
      {
        path: '*',
        handle: { title: 'Page not found' },
        lazy: async () => {
          const { NotFoundPage } =
            await import('../../pages/not-found/NotFoundPage')
          return { Component: NotFoundPage }
        },
      },
    ],
  },
])
