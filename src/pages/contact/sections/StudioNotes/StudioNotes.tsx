import { useRef } from 'react'
import { Link } from 'react-router'
import { routePaths } from '../../../../app/router/routePaths'
import { useStudioNotesAnimation } from './hooks/useStudioNotesAnimation'
import { studioNoteItems } from './studioNoteItems'
import styles from './StudioNotes.module.scss'

export function StudioNotes() {
  const sectionReference = useRef<HTMLElement>(null)
  const introductionReference = useRef<HTMLDivElement>(null)

  useStudioNotesAnimation(sectionReference, introductionReference)

  return (
    <section
      ref={sectionReference}
      className={styles.studioNotes}
      aria-labelledby="studio-notes-title"
    >
      <div className={styles.content}>
        <h2 id="studio-notes-title" className={styles.title}>
          News
        </h2>

        <div className={styles.notesGrid}>
          {studioNoteItems.map((note) => {
            return (
              <article key={note.id} className={styles.note}>
                <Link
                  className={styles.noteLink}
                  to={`${routePaths.news}/${note.id}`}
                >
                  <div className={styles.imageFrame}>
                    <img
                      className={styles.noteImage}
                      src={note.image}
                      width={771}
                      height={1024}
                      alt={note.imageAlt}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: note.imagePosition }}
                    />
                    <span className={styles.imageArrow} aria-hidden="true">↗</span>
                  </div>

                  <div className={styles.noteText}>
                    <time className={styles.date} dateTime={note.date}>
                      {note.dateLabel}
                    </time>
                    <h3 className={styles.noteTitle}>{note.title}</h3>
                    <p className={styles.noteDescription}>{note.description}</p>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>

      <div ref={introductionReference} className={styles.introduction}>
        <p className={styles.description}>
          Our thoughts on how brands, systems, and stories find their form.
        </p>
        <Link
          className={styles.readAllLink}
          to={routePaths.news}
        >
          Read All
          <svg
            className={styles.arrow}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M4 12h15m-6-6 6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </Link>
      </div>
    </section>
  )
}
