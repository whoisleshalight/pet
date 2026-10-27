import { useRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import { useLocation } from 'react-router'
import { useSmoothScroll } from './useSmoothScroll'

type SmoothScrollProps = {
  children: ReactNode
  contentReference: RefObject<HTMLElement | null>
}

export function SmoothScroll({ children, contentReference }: SmoothScrollProps) {
  const wrapperReference = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useSmoothScroll(wrapperReference, contentReference, location.key)

  return (
    <div className="smooth-scroll-wrapper" ref={wrapperReference}>
      <main
        className="smooth-scroll-content"
        id="main-content"
        ref={contentReference}
        tabIndex={-1}
      >
        {children}
      </main>
    </div>
  )
}
