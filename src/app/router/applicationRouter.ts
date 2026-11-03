import { createBrowserRouter } from 'react-router'
import { SiteLayout } from '../layouts/site/SiteLayout'
import { SiteErrorLayout } from '../layouts/site/SiteErrorLayout'
import { routePaths } from './routePaths'

// The layout persists between pages. Each page loads its JavaScript on demand.
export const applicationRouter = createBrowserRouter([
  {
    Component: SiteLayout,
    ErrorBoundary: SiteErrorLayout,
    children: [
      {
        index: true,
        handle: { title: 'Home', headerVariant: 'expanded' },
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
        path: routePaths.news,
        handle: { title: 'News' },
        lazy: async () => {
          const { NewsPage } = await import('../../pages/news/NewsPage')
          return { Component: NewsPage }
        },
      },
      {
        path: routePaths.article,
        handle: { title: 'Article' },
        lazy: async () => {
          const { ArticlePage } = await import('../../pages/article/ArticlePage')
          return { Component: ArticlePage }
        },
      },
      {
        path: routePaths.projects,
        handle: { title: 'Projects' },
        lazy: async () => {
          const { ProjectsPage } = await import('../../pages/projects/ProjectsPage')
          return { Component: ProjectsPage }
        },
      },
      {
        path: routePaths.project,
        handle: { title: 'Project' },
        lazy: async () => {
          const { ProjectPage } = await import('../../pages/project/ProjectPage')
          return { Component: ProjectPage }
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
