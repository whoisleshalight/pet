import { useId, useRef } from 'react'
import { Link } from 'react-router'
import { routePaths } from '../../../../app/router/routePaths'
import { Image } from '../../../../components/ui/Image'
import { newsItems } from '../../../../features/news/newsItems'
import { useNewsFeedAnimation } from './hooks/useNewsFeedAnimation'
import styles from './NewsFeed.module.scss'

export function NewsFeed() {
  const headingId = useId()
  const sectionReference = useRef<HTMLElement>(null)
  const galleryReference = useRef<HTMLDivElement>(null)

  useNewsFeedAnimation({
    sectionReference,
    galleryReference,
  })

  return (
    <section
      ref={sectionReference}
      className={styles.newsFeed}
      aria-labelledby={headingId}
    >


      <div ref={galleryReference} className={styles.gallery}>
        {newsItems.map((newsItem, itemIndex) => {
          return (
            <article
              key={newsItem.slug}
              className={styles.card}
              data-news-column={itemIndex % 3}
            >
              <Link
                className={styles.cardLink}
                to={`${routePaths.news}/${newsItem.slug}`}
                viewTransition
              >
                <div className={styles.imageFrame} data-cursor-label="Read">
                  <Image
                    className={styles.image}
                    src={newsItem.image}
                    width={newsItem.imageWidth}
                    height={newsItem.imageHeight}
                    alt={newsItem.imageAlt}
                    priority={itemIndex < 3}
                    decoding="async"
                    style={{ objectPosition: newsItem.imagePosition }}
                  />
                  <svg
                    className={styles.imageArrow}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 19 19 5M5 5h14v14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                <div className={styles.cardText}>
                  <time className={styles.date} dateTime={newsItem.date}>
                    {newsItem.dateLabel}
                  </time>
                  <h2 className={styles.cardTitle}>{newsItem.title}</h2>
                  <p className={styles.description}>{newsItem.description}</p>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}
