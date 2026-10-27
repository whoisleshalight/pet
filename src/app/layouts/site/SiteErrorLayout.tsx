import styles from './SiteLayout.module.scss'
import { useEffect, useRef } from 'react'
import { RouteErrorPage } from '../../../pages/route-error/RouteErrorPage'
import { Header } from './header'

export function SiteErrorLayout() {
  const headerReference = useRef<HTMLElement>(null)
  const mainContentReference = useRef<HTMLElement>(null)

  useEffect(() => {
    mainContentReference.current?.focus({ preventScroll: true })
  }, [])

  return (
    <>
      <Header headerReference={headerReference} />
      <main
        className={styles.siteMain}
        id="main-content"
        ref={mainContentReference}
        tabIndex={-1}
      >
        <RouteErrorPage />
      </main>
    </>
  )
}
