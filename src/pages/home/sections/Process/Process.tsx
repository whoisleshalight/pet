import { Fragment, useId, useRef } from 'react'
import { Section } from '../../../../components/ui/Section'
import { useProcessAnimation } from './hooks/useProcessAnimation'
import { processSteps } from './processSteps'
import styles from './Process.module.scss'

const timelineTicks = Array.from({ length: 12 }, (_, index) => {
  return String(index + 1).padStart(2, '0')
})

interface ProcessWordsProps {
  text: string
}

function ProcessWords({ text }: ProcessWordsProps) {
  return text.split(' ').map((word, wordIndex) => {
    return (
      <Fragment key={`${word}-${wordIndex}`}>
        {wordIndex > 0 && ' '}
        <span className={styles.wordMask}>
          <span className={styles.word}>{word}</span>
        </span>
      </Fragment>
    )
  })
}

export function Process() {
  const headingId = useId()
  const sectionReference = useRef<HTMLElement>(null)

  useProcessAnimation(sectionReference)

  return (
    <Section
      ref={sectionReference}
      className={styles.process}
      containerClassName={styles.processContainer}
      aria-labelledby={headingId}
    >
      <header className={styles.introduction}>
        <h2
          id={headingId}
          className={styles.title}
          aria-label="The Process"
        >
          {['The', 'Process'].map((word, wordIndex) => {
            return (
              <Fragment key={word}>
                {wordIndex > 0 && ' '}
                <span className={styles.titleWord} aria-hidden="true">
                  {Array.from(word).map((letter, letterIndex) => {
                    return (
                      <span
                        key={`${letter}-${letterIndex}`}
                        className={styles.titleLetter}
                      >
                        {letter}
                      </span>
                    )
                  })}
                </span>
              </Fragment>
            )
          })}
        </h2>

        <p className={styles.introductionCopy}>
          <ProcessWords text="Honest impressions from the teams we’ve collaborated with across brand and digital work." />
        </p>
      </header>

      <div className={styles.timeline} aria-hidden="true">
        <div className={styles.guides}>
          {timelineTicks.map((tick) => {
            return <span key={tick} className={styles.guide} />
          })}
        </div>

        <ol className={styles.timelineRows}>
          {processSteps.map((step) => {
            return (
              <li
                key={step.id}
                className={`${styles.bar} ${styles[step.id]}`}
              >
                <span className={styles.barFill} />
                <span className={styles.barLabel}>
                  <ProcessWords text={step.title} />
                </span>
              </li>
            )
          })}
        </ol>

        <div className={styles.scale}>
          {timelineTicks.map((tick) => {
            return (
              <span key={tick} className={styles.tick}>
                {tick}
              </span>
            )
          })}
        </div>
      </div>

      <ol className={styles.steps}>
        {processSteps.map((step) => {
          return (
            <li key={step.id} className={styles.step}>
              <h3 className={styles.stepTitle}>
                <ProcessWords text={step.title} />
              </h3>
              <p className={styles.stepDescription}>
                <ProcessWords text={step.description} />
              </p>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
