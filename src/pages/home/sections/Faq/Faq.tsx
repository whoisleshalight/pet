import { useId, useRef, useState } from 'react'
import { routePaths } from '../../../../app/router/routePaths'
import { ArrowLink } from '../../../../components/ui/ArrowLink'
import { Container } from '../../../../components/ui/Container'
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
      aria-labelledby={headingId}
    >
      <Container className={styles.layout}>
        <div className={styles.introduction}>
          <h2 id={headingId} className={styles.title}>
            Questions, answered.
          </h2>

          <div className={styles.about}>
            <p className={styles.description}>
              Learn more about the people and principles behind the work.
            </p>
            <ArrowLink
              to={routePaths.about}
              className={styles.link}
              arrowDirection="upRight"
            >
              About us
            </ArrowLink>
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
            <ArrowLink
              to={routePaths.contact}
              className={styles.link}
              arrowDirection="upRight"
            >
              Ask a question
            </ArrowLink>
          </div>
        </div>
      </Container>
    </Section>
  )
}
