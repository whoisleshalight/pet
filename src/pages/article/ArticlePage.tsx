import { useParams } from 'react-router'
import { routePaths } from '../../app/router/routePaths'
import { ArrowLink } from '../../components/ui/ArrowLink'
import { Image } from '../../components/ui/Image'
import { newsItems } from '../../features/news/newsItems'
import { NotFoundPage } from '../not-found/NotFoundPage'
import styles from './ArticlePage.module.scss'

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = newsItems.find((newsItem) => newsItem.slug === slug)

  if (!article) {
    return <NotFoundPage />
  }

  return (
    <article className={styles.article}>
      <header className={styles.introduction}>
        <ArrowLink className={styles.backLink} to={routePaths.news}>
          All notes
        </ArrowLink>
        <time className={styles.date} dateTime={article.date}>
          {article.dateLabel}
        </time>
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.description}>{article.description}</p>
      </header>

      <div className={styles.content}>
        <Image
          className={styles.image}
          src={article.image}
          width={article.imageWidth}
          height={article.imageHeight}
          alt={article.imageAlt}
          priority
          style={{ objectPosition: article.imagePosition }}
        />
        <div className={styles.body}>
          {article.paragraphs.map((paragraph) => {
            return <p key={paragraph}>{paragraph}</p>
          })}
          <ArrowLink className={styles.backLink} to={routePaths.news}>
            Back to Studio Notes
          </ArrowLink>
        </div>
      </div>
    </article>
  )
}
