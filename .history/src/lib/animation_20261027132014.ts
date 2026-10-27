import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function getIntroScrollDistance() {
  return window.innerHeight * 0.65
}

export { gsap, useGSAP }
