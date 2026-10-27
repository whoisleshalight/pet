import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// The header and intro finish their scroll transition at the same position.
export function getIntroScrollDistance() {
  return window.innerHeight * 0.65
}

export { gsap, useGSAP }
