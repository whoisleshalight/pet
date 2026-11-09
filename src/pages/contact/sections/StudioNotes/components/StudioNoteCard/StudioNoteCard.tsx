import { Link } from 'react-router'
import { routePaths } from '../../../../../../app/router/routePaths'
import type { StudioNote } from '../../studioNoteItems'
import styles from './StudioNoteCard.module.scss'

interface StudioNoteCardProps {
  note: StudioNote
}

export function StudioNoteCard({ note }: StudioNoteCardProps) {
  return (
    <article className={styles.note}>
      <Link
        className={styles.noteLink}
        to={`${routePaths.news}/${note.id}`}
        viewTransition
      >
        <div className={styles.imageFrame} data-cursor-label="Read">
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
          <span className={styles.imageArrow} aria-hidden="true">
            ↗
          </span>
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
}
