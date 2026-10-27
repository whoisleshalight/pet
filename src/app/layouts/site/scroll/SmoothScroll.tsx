import './SmoothScroll.scss'
import { useRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import { useSmoothScroll } from './useSmoothScroll'

type SmoothScrollProps = {
  children: ReactNode
  contentReference: RefObject<HTMLElement | null>
  navigationKey: string
}

export function SmoothScroll({
  children,
  contentReference,
  navigationKey,
}: SmoothScrollProps) {
  const wrapperReference = useRef<HTMLDivElement>(null)

  useSmoothScroll(wrapperReference, contentReference, navigationKey)

  return (
    <div className="smoothScrollWrapper" ref={wrapperReference}>
      {children}
    </div>
  )
}
