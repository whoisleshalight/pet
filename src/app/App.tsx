import { useCallback, useState, useSyncExternalStore } from 'react'
import { RouterProvider } from 'react-router/dom'
import { applicationRouter } from './router/applicationRouter'
import { Preloader } from './preloader/Preloader'
import { DeferredResourcesContext } from './preloader/DeferredResourcesContext'

function subscribeToRouter(onChange: () => void) {
  return applicationRouter.subscribe(onChange)
}

function getInitialPageSnapshot() {
  return applicationRouter.state.initialized
}

export function App() {
  const [isLoading, setIsLoading] = useState(true)
  const isPageReady = useSyncExternalStore(
    subscribeToRouter,
    getInitialPageSnapshot,
  )
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <DeferredResourcesContext.Provider value={!isLoading}>
      <div inert={isLoading} aria-busy={isLoading}>
        <RouterProvider router={applicationRouter} />
      </div>
      {isLoading && (
        <Preloader
          isPageReady={isPageReady}
          onComplete={handleLoadingComplete}
        />
      )}
    </DeferredResourcesContext.Provider>
  )
}
