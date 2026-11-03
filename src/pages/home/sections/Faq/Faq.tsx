import { useId, useRef, useState } from 'react'
import { Link } from 'react-router'
import { routePaths } from '../../../../app/router/routePaths'
import { Section } from '../../../../components/ui/Section'
import { FaqItem } from './components/FaqItem/FaqItem'
import { useFaqAnimation } from './hooks/useFaqAnimation'
import { faqItems } from './faqItems'
import styles from './Faq.module.scss'

export function Faq() {
  const headingId = useId()
  const sectionReference = useRef<HTMLElement>(null)
  const [expandedId, setExpandedId] = useState<string | null>(() => {
    if (window.matchMedia('(min-width: 1200px)').matches) {
      return 'new-project'
    }

    return null
  })

  useFaqAnimation(sectionReference)

  function handleToggle(itemId: string) {
    setExpandedId((previousId) => {
      return previousId === itemId ? null : itemId
    })
  }

  return (
    <Section
      ref={sectionReference}
      id="faq"
      className={styles.faq}
      containerClassName={styles.layout}
      aria-labelledby={headingId}
    >
      <div className={styles.introduction}>
        <h2 id={headingId} className={styles.title}>
          Questions, answered.
        </h2>

        <div className={styles.about}>
          <p className={styles.description}>
            Learn more about the people and principles behind the work.
          </p>
          <Link to={routePaths.about} className={styles.link}>
            <svg
              className={styles.arrow}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M5 19 19 5M5 5h14v14"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            About us
          </Link>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.questions}>
          {faqItems.map((item) => {
            return (
              <FaqItem
                key={item.id}
                item={item}
                isExpanded={expandedId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            )
          })}
        </div>

        <div className={styles.contact}>
          <p className={styles.contactDescription}>
            Still have questions? Let’s talk about your project and how we
            can help.
          </p>
          <Link to={routePaths.contact} className={styles.link}>
            <svg
              className={styles.arrow}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M5 19 19 5M5 5h14v14"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Ask a question
          </Link>
        </div>
      </div>
    </Section>
  )
}
