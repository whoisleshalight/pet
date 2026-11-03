import { Partners } from './sections/Partners'
import { Process } from './sections/Process'
import styles from './HomePage.module.scss'

export function HomePage() {
  return (
    <div className={styles.homePage}>
      <Partners />
      <Process />
    </div>
  )
}
