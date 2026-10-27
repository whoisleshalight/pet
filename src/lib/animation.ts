import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother)

export function getIntroScrollDistance() {
  return window.innerHeight * 0.65
}

export { gsap, useGSAP, ScrollTrigger, ScrollSmoother }
