import { useId, useRef } from 'react'
import { routePaths } from '../../../../app/router/routePaths'
import { ArrowLink } from '../../../../components/ui/ArrowLink'
import { Container } from '../../../../components/ui/Container'
import { Section } from '../../../../components/ui/Section'
import { StudioNoteCard } from './components/StudioNoteCard/StudioNoteCard'
import { useStudioNotesAnimation } from './hooks/useStudioNotesAnimation'
import { studioNoteItems } from './studioNoteItems'
import styles from './StudioNotes.module.scss'

export function StudioNotes() {
  const headingId = useId()
  const sectionReference = useRef<HTMLElement>(null)
  const sidebarReference = useRef<HTMLDivElement>(null)
  const introductionReference = useRef<HTMLDivElement>(null)

  useStudioNotesAnimation({
    sectionReference,
    sidebarReference,
    introductionReference,
  })

  return (
    <Section
      ref={sectionReference}
      className={styles.studioNotes}
      aria-labelledby={headingId}
    >
      <Container className={styles.layout}>
        <div className={styles.content}>
          <h2 id={headingId} className={styles.title}>
            News
          </h2>

          <div className={styles.notesGrid}>
            {studioNoteItems.map((note) => {
              return <StudioNoteCard key={note.id} note={note} />
            })}
          </div>
        </div>

        <div ref={sidebarReference} className={styles.sidebar}>
          <div ref={introductionReference} className={styles.introduction}>
            <p className={styles.description}>
              Our thoughts on how brands, systems, and stories find their form.
            </p>
            <ArrowLink
              className={styles.readAllLink}
              to={routePaths.news}
              arrowPosition="end"
            >
              Read All
            </ArrowLink>
          </div>
        </div>
      </Container>
    </Section>
  )
}
