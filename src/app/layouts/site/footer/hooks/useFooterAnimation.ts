import type { RefObject } from 'react'
import { gsap, useGSAP } from '../../../../../lib/animation'
import styles from '../Footer.module.scss'

export function useFooterAnimation(
  footerReference: RefObject<HTMLElement | null>,
  pathname: string,
) {
  const animation = useGSAP(
    () => {
      const footer = footerReference.current

      if (!footer) {
        return
      }

      const mediaQueries = gsap.matchMedia()

      mediaQueries.add(
        '(min-width: 1200px) and (prefers-reduced-motion: no-preference)',
        () => {
          const brand = footer.querySelector<HTMLElement>(`.${styles.brand}`)
          const blinds = footer.querySelectorAll(`.${styles.brandBlind}`)

          if (!brand) {
            return
          }

          gsap.set(blinds, {
            scaleY: 1,
            transformOrigin: 'center bottom',
          })

          gsap.to(blinds, {
            scaleY: 0,
            // duration: 0.9,
            stagger: 0.2,
            ease: 'none',
            scrollTrigger: {
              trigger: brand,
              start: 'top bottom',
              end: 'bottom bottom-=30%',
              scrub: 1,
            },
          })
        },
        footer,
      )

      return () => mediaQueries.revert()
    },
    {
      scope: footerReference,
      dependencies: [pathname],
      revertOnUpdate: true,
    },
  )

  return { contextSafe: animation.contextSafe }
}
