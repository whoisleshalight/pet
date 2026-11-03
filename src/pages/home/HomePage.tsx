import { FeaturedProject } from './sections/FeaturedProject'
import { Partners } from './sections/Partners'
import { Process } from './sections/Process'
import { Faq } from './sections/Faq'
import styles from './HomePage.module.scss'

export function HomePage() {
  return (
    <div className={styles.homePage}>
      <FeaturedProject />
      <Partners />
      <Process />
      <Faq />
    </div>
  )
}
