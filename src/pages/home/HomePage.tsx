import { Hero } from './sections/Hero'
import { FeaturedProject } from './sections/FeaturedProject'
import { Services } from './sections/Services'
import { Partners } from './sections/Partners'
import { Process } from './sections/Process'
import { Faq } from './sections/Faq'
import styles from './HomePage.module.scss'

export function HomePage() {
  return (
    <div className={styles.homePage}>
      <Hero />
      <FeaturedProject />
      <Services />
      <Partners />
      <Process />
      <Faq />
    </div>
  )
}
